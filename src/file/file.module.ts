import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UploadFileConfig } from './../utils/config/uploadfile.config';
import { ConfigurationModule } from './../configuration/config.module';
import { AuthModule } from './../auth/auth.module';
import { GameModule } from './../game/game.module';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from './../utils/gateway/gateway';
import { AchievementModule } from './../achievement/achievement.module';
import { LeaderboardModule } from './../leaderboard/leaderboard.module';
import { EventModule } from './../event/event.module';

@Module({
  imports: [
    ClientsModule.registerAsync(GatewayOptions),
    ConfigurationModule,
    AuthModule,
    GameModule,
    AchievementModule,
    LeaderboardModule,
    EventModule,
    MulterModule.registerAsync(UploadFileConfig),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
