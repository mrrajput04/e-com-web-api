import {
  Body,
  Controller,
  Get,
  Inject,
  Res,
  Param,
  HttpStatus,
  Post,
  Req,
  Header,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  //   @Get(':id')
  //   public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //     return this.service.getUser(id);
  //   }

  @Post('register')
  public createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Post('login')
  public loginUser(@Body() body: LoginUserDto) {
    return this.service.loginUser(body);
  }

  @Post('forget-password')
  public forgetPassword(@Body() body: ForgotPasswordDto) {
    return this.service.forgetPassword(body);
  }
}
