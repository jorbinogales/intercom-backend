import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import * as multerGoogleStorage from 'multer-google-storage';
import { RenameImage } from 'src/utils/helpers/renameFileName.filter';
import { PictureFilterFile } from 'src/utils/helpers/picture.filter';
import { join } from "path";
import { GameModule } from 'src/game/game.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { AchievementModule } from 'src/achievement/achievement.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    GameModule,
    LeaderboardModule,
    AchievementModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
           storage:
            multerGoogleStorage.storageEngine({
                projectId: configService.get<string>('CLOUD_PROYECT_ID'),
                bucket: configService.get<string>('CLOUD_BUCKET'),
                keyFilename: join(__dirname, '..', configService.get<string>('CLOUD_KEY_JSON')),
                fileName: RenameImage,
            }),
             limits: {
                fileSize: 2400000,
            },
            fileFilter: PictureFilterFile,
        }
      }
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
