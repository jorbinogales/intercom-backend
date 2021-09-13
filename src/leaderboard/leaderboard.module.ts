import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { GameModule } from 'src/game/game.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [
      AuthModule,
      GameModule,
      ClientsModule.registerAsync(GatewayOptions),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
