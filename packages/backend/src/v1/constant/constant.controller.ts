import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@auth/auth.decorator';
import { PrismaService } from '@prisma/prisma.service';
import {
  DatePlanCategoryResponse,
  DatePlanResponse,
  HobbyCategoryResponse,
  HobbyResponse,
} from '@constant/constant.entity';

@Controller({
  path: '/constant',
  version: '1',
})
@ApiTags('constant')
export class ConstantController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/date_plans')
  @UseAuth()
  async getDatePlans(): Promise<DatePlanResponse[]> {
    const result = await this.prismaService.datePlan.findMany();
    return result.map(h => ({
      id: h.id,
      name: h.name,
      image: h.image,
      category_id: h.date_plan_categoryId,
    }));
  }

  @Get('/date_plan_categoreis')
  @UseAuth()
  async getDatePlanCategories(): Promise<DatePlanCategoryResponse[]> {
    const result = await this.prismaService.datePlanCategory.findMany();
    return result.map(h => ({
      id: h.id,
      name: h.name,
    }));
  }

  @Get('/hobbies')
  @UseAuth()
  async getHobbies(): Promise<HobbyResponse[]> {
    const result = await this.prismaService.hobby.findMany();
    return result.map(h => ({
      id: h.id,
      name: h.name,
      category_id: h.hobby_categoryId,
    }));
  }

  @Get('/hobby_categories')
  @UseAuth()
  async getHobbyCategories(): Promise<HobbyCategoryResponse[]> {
    const result = await this.prismaService.hobbyCategory.findMany();
    return result.map(h => ({
      id: h.id,
      name: h.name,
    }));
  }
}
