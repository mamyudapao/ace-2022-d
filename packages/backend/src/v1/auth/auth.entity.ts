import { IsAscii, IsDateString, IsEmail, IsIn, IsNotEmpty, Length } from 'class-validator';
import { Gender, Prefecture } from '@prisma/client';

export class LoginRequest {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsAscii()
  password!: string;
}

export class LoginResponse {
  access_token!: string;
  refresh_token!: string;
}

export class RefreshTokenRequest {
  @IsNotEmpty()
  @IsAscii()
  refresh_token!: string;
}

export class RefreshTokenResponse {
  access_token!: string;
  refresh_token!: string;
}

export class RegisterRequest {
  @IsEmail()
  email!: string;

  @Length(1, 8)
  nickname!: string;

  @IsAscii()
  @Length(6, 1024)
  password!: string;

  @IsDateString()
  birthday!: string;

  @IsIn(Object.keys(Gender))
  gender!: Gender;

  @IsIn(Object.keys(Prefecture))
  prefecture!: Prefecture;
}

export class RegisterResponse {
  access_token!: string;
  refresh_token!: string;
}
