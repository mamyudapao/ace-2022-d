import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@auth/auth.decorator';
import { UpdateUserRequest, UserResponse } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { Profile, Talk, User } from '@prisma/client';

@Controller({
  path: '/users',
  version: '1',
})
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/@me')
  @UseAuth()
  me(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } }
  ): UserResponse {
    return {
      id: request.user.id,
      email: request.user.email,
      nickname: request.user.nickname,
      gender: request.user.gender,
      birthday: request.user.birthday,
      prefecture: request.user.prefecture,
      profile: request.user.profile,
      created_at: request.user.created_at,
      updated_at: request.user.updated_at,
    };
  }

  @Put('/@me')
  @UseAuth()
  async updateMe(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } },
    @Body() updateUserRequest: UpdateUserRequest
  ): Promise<UserResponse> {
    const result = await this.userService.updateUser(request.user.id, updateUserRequest);
    return {
      id: result.id,
      email: result.email,
      nickname: result.nickname,
      gender: result.gender,
      birthday: result.birthday,
      prefecture: result.prefecture,
      profile: result.profile,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }

  @Get('/:id')
  @UseAuth()
  async getUser(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } },
    @Param('id') id: string
  ): Promise<UserResponse> {
    const result = await this.userService.getUser(id);
    return {
      id: result.id,
      email: request.user.id === id ? request.user.email : null,
      nickname: result.nickname,
      gender: result.gender,
      birthday: result.birthday,
      prefecture: result.prefecture,
      profile: result.profile,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }
}
