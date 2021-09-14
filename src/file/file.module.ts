import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { GameModule } from '../game/game.module';
import { AuthModule } from '../auth/auth.module';
import { UploadFileConfig } from 'src/utils/config/uploadfile.config';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    forwardRef(() => GameModule),
    MulterModule.registerAsync(UploadFileConfig),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
