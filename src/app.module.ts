import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AchievementModule } from './achievement/achievement.module';
import { AchievementUnlockedModule } from './achievement-unlocked/achievement-unlocked.module';
import { GameUserModule } from './game-user/game-user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoreModule } from './score/score.module';
import { EventModule } from './event/event.module';
import { EventPlayerModule } from './event-player/event-player.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ScreenshotsModule } from './screenshots/screenshots.module';
import { FileModule } from './file/file.module';
require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({ path: `environment/.env.${process.env.NODE_ENV}`, safe: true }),
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
    ScreenshotsModule,
    FileModule,
  ]
    
})
export class AppModule {}
