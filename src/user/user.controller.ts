import {
  Body,
  Controller,
  Get,
  Inject,
  Res,
  Query,
  HttpStatus,
  Post,
  Req,
  Header,
} from '@nestjs/common';
import { access } from 'fs';
import { Response } from 'express';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  emailVerifyDto,
} from './dto/user.dto';
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
  public loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const data = res.cookie('access_token', body, { httpOnly: true });
    return res;
  }

  @Post('forget-password')
  public forgetPassword(@Body() body: ForgotPasswordDto) {
    return this.service.forgetPassword(body);
  }

  @Get('verify:email')
  public verifyEmail(@Query() token: emailVerifyDto): Promise<void> {
    console.log(token);
    return this.service.verifyEmail(token);
  }

  @Get('get')
  findAll(@Res({ passthrough: true }) res: Response) {
    res.cookie('auth', 'token', { httpOnly: true });
    return access;
  }
}
