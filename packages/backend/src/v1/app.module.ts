import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from '@v1/app.controller';
import { AppService } from '@v1/app.service';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { TalkModule } from '@talk/talk.module';
import { PrismaModule } from '@prisma/prisma.module';
import { ConstantModule } from '@constant/constant.module';

@Module({
  controllers: [AppController],
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TalkModule,
    ConstantModule,
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
