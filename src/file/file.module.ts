import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UploadFileConfig } from './../utils/config/uploadfile.config';
import { ConfigurationModule } from './../configuration/config.module';
import { AuthModule } from './../auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from './../utils/gateway/gateway';

@Module({
  imports: [
    ClientsModule.registerAsync(GatewayOptions),
    ConfigurationModule,
    AuthModule,
    MulterModule.registerAsync(UploadFileConfig),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
