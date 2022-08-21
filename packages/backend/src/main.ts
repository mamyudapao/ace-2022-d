import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { AppModule } from '@v1/app.module';
import { TalkFilter } from '@talk/talk.filter';

const bootstrap = async () => {
  const application = await NestFactory.create<NestExpressApplication>(AppModule);

  application.enableCors({
    origin: ['http://localhost:3000', 'https://front.d.ace2208.net'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  application.use(compression());
  application.use(cookieParser());
  application.use(
    csurf({
      cookie: true,
      value: req => req.csrfToken(),
    })
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
  application.use(require('helmet')());

  application.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );

  application.useGlobalFilters(new TalkFilter());

  application.enableVersioning({ type: VersioningType.URI });

  await application.listen(3001, '0.0.0.0');
};

bootstrap().catch(e => console.error(e));
