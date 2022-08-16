import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserRequest } from '@user/user.entity';
import { Profile, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<User & { profile: Profile | null }> {
    const result = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!result) throw new NotFoundException('User not found');

    return result;
  }

  async updateUser(
    id: string,
    data: UpdateUserRequest
  ): Promise<User & { profile: Profile | null }> {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        prefecture: data.prefecture,
        profile: {
          create: {
            description: data.description,
            avatar: data.avatar,
            height: data.height,
            weight: data.weight,
            education: data.education,
            income: data.income,
            holiday: data.holiday,
            work_prefecture: data.work_prefecture,
            born_prefecture: data.born_prefecture,
            blood_type: data.blood_type,
            marry_intention: data.marry_intention,
            date_plans: {
              connect: data.date_plans?.map(plan => ({ id: plan })),
            },
            hobbies: {
              connect: data.hobbies?.map(hobby => ({ id: hobby })),
            },
          },
          update: {
            description: data.description,
            avatar: data.avatar,
            height: data.height,
            weight: data.weight,
            education: data.education,
            income: data.income,
            holiday: data.holiday,
            work_prefecture: data.work_prefecture,
            born_prefecture: data.born_prefecture,
            blood_type: data.blood_type,
            marry_intention: data.marry_intention,
            date_plans: {
              connect: data.date_plans?.map(plan => ({ id: plan })),
            },
            hobbies: {
              connect: data.hobbies?.map(hobby => ({ id: hobby })),
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }
}
