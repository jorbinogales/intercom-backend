import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
    .setTitle('HUB VIDEO JUEGOS NEST')
    .setDescription('THE API BACK PIXELING')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'XYZ')
    .build();


    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
  Logger.log('GATEWAY IS RUNNING');
}
bootstrap();
