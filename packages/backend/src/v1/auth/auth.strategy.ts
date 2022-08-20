import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Profile, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService, configService: ConfigService) {
    const extractJwt = ExtractJwt as {
      fromAuthHeaderAsBearerToken(): JwtFromRequestFunction;
    };

    super({
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken() as (req: Request) => string | null,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub?: string }): Promise<User & { profile: Profile | null }> {
    if (!payload.sub) throw new UnauthorizedException('Invalid access token');

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
      include: {
        profile: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid access token');

    return user;
  }
}
