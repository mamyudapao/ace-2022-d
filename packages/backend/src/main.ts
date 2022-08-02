import { AppModule } from '@v1/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

const bootstrap = async () => {
  const application = await NestFactory.create<NestExpressApplication>(AppModule);

  application.enableCors();
  application.disable('x-powered-by');
  application.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );
  application.enableVersioning({ type: VersioningType.URI });

  await application.listen(3001, '0.0.0.0');
};

bootstrap().catch(e => console.error(e));
