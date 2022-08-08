import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
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
