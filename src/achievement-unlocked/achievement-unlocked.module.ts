import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AchievementModule } from './../achievement/achievement.module';
import { AuthModule } from './../auth/auth.module';
import { GameUserModule } from './../game-user/game-user.module';
import { GatewayOptions } from './../utils/gateway/gateway';
import { AchievementUnlockedController } from './achievement-unlocked.controller';
import { AchievementUnlockedService } from './achievement-unlocked.service';

@Module({
  imports: [
    AuthModule,
    GameUserModule,
    AchievementModule,
    ClientsModule.registerAsync(GatewayOptions),
  ],
  controllers: [AchievementUnlockedController],
  providers: [AchievementUnlockedService],
  exports: [AchievementUnlockedService]
})
export class AchievementUnlockedModule {}
