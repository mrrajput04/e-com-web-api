import {
  Body,
  Controller,
  Get,
  Inject,
  Res,
  Query,
  Post,
} from '@nestjs/common';
import { access } from 'fs';
import { Response } from 'express';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  emailVerifyDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { UpdateUserDto } from './dto/user.updateDto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  // @Get(':id')
  // public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.service.getUser(id);
  // }

  @Post('register')
  public createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Post('login')
  public loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
    return this.service.loginUser(body, res);
  }

  @Post('forget-password')
  public forgetPassword(@Body() body: ForgotPasswordDto) {
    return this.service.forgetPassword(body);
  }

  @Post('reset-password')
  public resetPassword(@Body() body: ResetPasswordDto) {
    return this.service.resetPassword(body);
  }

  @Get('verify:email')
  public verifyEmail(
    @Query() token: emailVerifyDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.service.verifyEmail(token, res);
  }

  @Get('get')
  findAll(@Res({ passthrough: true }) res: Response) {
    res.cookie('auth', 'token', { httpOnly: true });
    return access;
  }
}
