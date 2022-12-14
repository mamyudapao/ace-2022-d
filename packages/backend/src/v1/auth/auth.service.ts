import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Gender, Prefecture, Profile, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    const invalidErrorMessage = 'Email or password is invalid';

    if (!user) throw new UnauthorizedException(invalidErrorMessage);
    if (!(await compare(password, user.password)))
      throw new UnauthorizedException(invalidErrorMessage);

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub_refresh: user.id,
      },
      {
        expiresIn: '7d',
      }
    );

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refresh_token: { set: await hash(refreshToken, 10) },
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let payload: {
      sub_refresh: string;
    };

    const invalidErrorMessage = 'Invalid refresh token';

    try {
      payload = this.jwtService.verify<{
        sub_refresh: string;
      }>(refreshToken);
    } catch (e) {
      throw new BadRequestException(invalidErrorMessage);
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub_refresh,
      },
    });

    if (!user) throw new BadRequestException(invalidErrorMessage);
    if (!(await compare(refreshToken, user.refresh_token)))
      throw new BadRequestException(invalidErrorMessage);

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '15m',
      }
    );

    const newRefreshToken = this.jwtService.sign(
      {
        sub_refresh: user.id,
      },
      {
        expiresIn: '7d',
      }
    );

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refresh_token: { set: await hash(newRefreshToken, 10) },
      },
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async register(
    email: string,
    password: string,
    nickname: string,
    gender: string,
    birthday: string,
    prefecture: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (await this.prismaService.user.findUnique({ where: { email } }))
      throw new BadRequestException('Email is already registered');

    const userId = randomUUID();

    const accessToken = this.jwtService.sign(
      {
        sub: userId,
      },
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub_refresh: userId,
      },
      {
        expiresIn: '7d',
      }
    );

    await this.prismaService.user.create({
      data: {
        id: userId,
        email,
        nickname,
        password: await hash(password, 10),
        refresh_token: await hash(refreshToken, 10),
        birthday: birthday,
        gender: gender as Gender,
        prefecture: prefecture as Prefecture,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getUserFromToken(token: string): Promise<(User & { profile: Profile | null }) | null> {
    try {
      const payload = this.jwtService.verify<{
        sub: string;
      }>(token);

      return await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
        include: {
          profile: true,
        },
      });
    } catch (e) {
      throw new BadRequestException('Invalid access token');
    }
  }
}
