import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { GameUserModule } from 'src/game-user/game-user.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  imports: [
    AuthModule,
    GameUserModule,
    LeaderboardModule,
    ClientsModule.register(GatewayOptions),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoreModule {}
