import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { TalkController } from '@talk/talk.controller';
import { TalkGateway } from '@talk/talk.gateway';
import { TalkService } from '@talk/talk.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TalkController],
  providers: [TalkService, TalkGateway],
})
export class TalkModule {}
