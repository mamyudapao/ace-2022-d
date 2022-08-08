import * as fs from 'node:fs';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@v1/app.module';

const generateSwagger = async () => {
  const application = await NestFactory.create(AppModule);

  application.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('ace_2022_team_d')
    .addServer('http://localhost:3001')
    .addServer('https://api.d.ace2208.net')
    .build();
  const document = SwaggerModule.createDocument(application, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });

  fs.writeFileSync('../swagger.json', JSON.stringify(document));
};

generateSwagger().catch(error => console.error(error));
