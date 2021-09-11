import { Logger, ValidationPipe } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EasyConfiguration } from './configuration/easyConfig.service';
import { env } from 'process';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService : EasyConfiguration = app.get(EasyconfigService);
  let objConfig = configService["envConfig"];
  console.log(objConfig)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({credentials: true, origin: objConfig.APP_ORIGIN});

  const options = new DocumentBuilder()
    .setTitle('HUB VIDEO JUEGOS NEST')
    .setDescription('THE API BACK PIXELING')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'XYZ')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  
  await app.listen(objConfig.PORT);

}
bootstrap();
