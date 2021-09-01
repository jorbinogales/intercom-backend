import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { GameModule } from 'src/game/game.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from 'src/utils/gateway/gateway';

@Module({
  imports: [
    AuthModule,
    GameModule,
    ClientsModule.register(GatewayOptions),
  ],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService],
})
export class AchievementModule {}
