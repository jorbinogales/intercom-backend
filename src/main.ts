import { ValidationPipe } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EasyConfiguration } from './configuration/easyConfig.service';
import { env } from 'process';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService : EasyConfiguration = app.get(EasyconfigService);
  let objConfig = configService["envConfig"];
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({credentials: true, origin: objConfig.APP_ORIGIN});
  
  await app.listen(objConfig.PORT);

}
bootstrap();
