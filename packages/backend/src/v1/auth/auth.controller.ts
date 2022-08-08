import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from '@dto/token.dto';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from '@auth/auth.entity';
import { AuthService } from '@auth/auth.service';

@Controller({
  path: '/auth',
  version: '1',
})
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const token: Token = await this.authService.login(loginRequest.email, loginRequest.password);

    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    };
  }

  @Post('/refreshToken')
  async refreshToken(
    @Body() refreshTokenRequest: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const token: Token = await this.authService.refreshToken(refreshTokenRequest.refresh_token);

    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    };
  }

  @Post('/register')
  async register(@Body() registerRequest: RegisterRequest): Promise<RegisterResponse> {
    const token: Token = await this.authService.register(
      registerRequest.email,
      registerRequest.password,
      registerRequest.nickname,
      registerRequest.gender,
      registerRequest.birthday,
      registerRequest.prefecture
    );

    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    };
  }
}
