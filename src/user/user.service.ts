import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto } from './user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
import { otpGenerator } from 'otp-generator';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async createUser(body: CreateUserDto): Promise<User> {
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
    return this.repository.save(value);
  }

  public async loginUser(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    if (password == null || password != user.password) {
      if (password == null)
        throw new HttpException('password not found', HttpStatus.NOT_FOUND);
    }
    let token;
    if (user && (await bcrypt.compare(password, user.password))) {
      token = sign(
        { payload: { _id: user.id, email: user.email } },
        process.env.JWT_SECRET,
        { expiresIn: '2h' },
      );
    }

    return { message: 'user login successfully', access_token: token };
  }

  public async forgetPassword(body: ForgotPasswordDto) {
    const email = body.email;
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) throw new HttpException('email not exist', HttpStatus.NOT_FOUND);
    return user;
  }
}
