import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { GameModule } from 'src/game/game.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { ConfigurationModule } from 'src/configuration/config.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    GameModule,
    ClientsModule.registerAsync(GatewayOptions),
  ],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
