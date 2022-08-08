import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Gender, Prefecture } from '@entity/user.entity';
import { UseAuth } from '@auth/auth.decorator';
import { UserResponse } from '@user/user.entity';
import { User } from '@prisma/client';

@Controller({
  path: '/users',
  version: '1',
})
@ApiTags('users')
export class UserController {
  @Get('/@me')
  @UseAuth()
  me(@Req() request: { user: User }): UserResponse {
    return {
      id: request.user.id,
      email: request.user.email,
      nickname: request.user.nickname,
      gender: Gender[request.user.gender],
      birthday: request.user.birthday,
      prefecture: Prefecture[request.user.prefecture],
    };
  }
}
