import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AchievementModule } from './achievement/achievement.module';
import { AchievementUnlockedController } from './achievement-unlocked/achievement-unlocked.controller';
import { AchievementUnlockedModule } from './achievement-unlocked/achievement-unlocked.module';
import { GameUserModule } from './game-user/game-user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoreModule } from './score/score.module';
import { EventModule } from './event/event.module';
import { EventPlayerModule } from './event-player/event-player.module';

@Module({
  imports: [
    CategoryModule,
    GameModule,
    AuthModule,
    UserModule,
    RoleModule,
    AchievementModule,
    AchievementUnlockedModule,
    GameUserModule,
    LeaderboardModule,
    ScoreModule,
    EventModule,
    EventPlayerModule,
  ],
  controllers: [AchievementUnlockedController],
})
export class AppModule {}
