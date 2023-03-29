import { IsEmail, IsNotEmpty, IsString, isEmail, isNotEmpty } from 'class-validator';

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

  public password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
