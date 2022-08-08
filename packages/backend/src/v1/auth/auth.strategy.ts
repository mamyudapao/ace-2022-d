import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
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

  async validate(payload: { sub: string }) {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid access token');

    return user;
  }
}