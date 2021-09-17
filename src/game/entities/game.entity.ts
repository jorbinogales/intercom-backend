import { AchievementEntity } from "src/achievement/entities/achievement.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { EventEntity } from "src/event/entities/event.entity";
import { GameUserEntity } from "src/game-user/entities/gameUser.entity";
import { LeaderBoardEntity } from "src/leaderboard/entities/leaderboard.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
    Entity
} from "typeorm";

@Entity('game')
export class GameEntity {

    id: number;
    category_id: number;
    achievements_value: AchievementEntity[];
    screenshots_value: [];
    events_value: EventEntity[];
    leaderboards_value: LeaderBoardEntity[];
    users_value: GameUserEntity[];
    title: string;
    description: string;
    icon: string;
    image: string;
    google_play: string;
    play_store: string;
    oculus_store: string;
    status: boolean;
    populity: boolean;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    category_value: any;
}
