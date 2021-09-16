import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UploadFileConfig } from 'src/utils/config/uploadfile.config';
import { ConfigurationModule } from 'src/configuration/config.module';
import { AuthModule } from 'src/auth/auth.module';
import { GameModule } from 'src/game/game.module';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { AchievementModule } from 'src/achievement/achievement.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { EventModule } from 'src/event/event.module';

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
