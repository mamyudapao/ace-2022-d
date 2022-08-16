import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { ConstantController } from '@constant/constant.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ConstantController],
})
export class ConstantModule {}
