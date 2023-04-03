import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
import { sendVerificationEmail } from 'src/auth/emailVerify';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async createUser(body: CreateUserDto) {
    const { firstName, lastName, email, password, confirmPassword } = body;
    const emailExists = await this.repository.findOne({
      where: { email: email },
    });
    if (emailExists)
      throw new HttpException('email already exists', HttpStatus.FORBIDDEN);
    if (password !== confirmPassword)
      throw new HttpException('password not matched', HttpStatus.FORBIDDEN);
    const hash = await bcrypt.hash(password, saltOrRounds);
    const value = {
      firstName,
      lastName,
      email,
      password: hash,
    };
    this.repository.save(value);
    const token = sign(
      { payload: { email: value.email } },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
    );
    await sendVerificationEmail(email, token);
    return {
      message: 'user registered successfully, check your email to verify',
      access_token: token,
    };
  }

  public async loginUser(body: LoginUserDto, res: Response) {
    console.log(body);
    const { email, password } = body;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    if (password == null || password != user.password) {
      if (password == null)
        throw new HttpException('password not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified == false) {
      throw new HttpException(
        'please verify your email',
        HttpStatus.UNAUTHORIZED,
      );
    }
    let token;
    if (user && (await bcrypt.compare(password, user.password))) {
      token = sign(
        { payload: { _id: user.id, email: user.email } },
        process.env.JWT_SECRET,
        { expiresIn: '2h' },
      );
      console.log(token);
      res = token;
      // res.cookie('auth', token, { httpOnly: true });
    }
    return res;
  }

  public async forgetPassword(body: ForgotPasswordDto) {
    const email = body.email;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) throw new HttpException('email not exist', HttpStatus.NOT_FOUND);
    return user;
  }

  public async verifyEmail(token: any) {
    console.log(token);
    const accessToken = verify(token.token, process.env.JWT_SECRET);
    if (!accessToken)
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    const payload = accessToken;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const email = payload.payload.email;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) throw new HttpException('email not exist', HttpStatus.NOT_FOUND);
    user.isVerified = true;
    await this.repository.save(user);
    return token;
  }
}
