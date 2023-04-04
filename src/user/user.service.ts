import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { User } from './entities/user.entity';
import { Otp } from './entities/otp.entity';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
import { sendVerificationEmail } from 'src/auth/emailVerify';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  private readonly otpRepository: Repository<Otp>;

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
    const { email, password } = body;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    if (password == null || password != user.password) {
      if (password == null)
        throw new HttpException('password not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
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
      res.cookie('auth_token', token, { httpOnly: true });
    }
    res.send('login successful');
    return body;
  }

  public async forgetPassword(body: ForgotPasswordDto) {
    const email = body.email;
    const user = await this.otpRepository.findOne({ where: { email: email } });
    if (!user) throw new HttpException('email not exist', HttpStatus.NOT_FOUND);
    return user;
  }

  public async resetPassword(body: ResetPasswordDto) {
    console.log(body, '====>');
    const { email, otp, password } = body;
    console.log(this.otpRepository, '==>>');
    const user = await this.otpRepository.findOne({ where: { email: email } });
    if (!user)
      throw new HttpException(
        `user not found with ${email}`,
        HttpStatus.NOT_FOUND,
      );
    console.log(otp, ' ==>>');
    const otpVerify = await this.otpRepository.findOne({ where: { otp: otp } });
    if (!otpVerify)
      throw new HttpException(`wrong otp`, HttpStatus.BAD_REQUEST);
    const passwordUpdate = await this.repository.update(user.id, {
      password: await bcrypt.hash(password, 10),
    });
    console.log(passwordUpdate, '------');
    return;
  }

  public async verifyEmail(token: any, res: Response) {
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
    res.send('you are now verified');
    return token;
  }
}
