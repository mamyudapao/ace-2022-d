import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';

export const UseAuth = () =>
  applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'API access token',
      required: true,
      schema: {
        type: 'String',
        example: 'Bearer <access_token>',
      },
    }),
    UseGuards(AuthGuard('jwt'))
  );
