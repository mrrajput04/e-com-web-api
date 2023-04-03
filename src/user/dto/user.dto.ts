import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  public password: string;

  public confirmPassword: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  public token: string;
  public password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}

export class emailVerifyDto {
  @IsNotEmpty()
  public token: any;
}

export class Response {
  public cookie: string;
}
