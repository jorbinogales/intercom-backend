import { GameUserEntity } from "src/game-user/entities/gameUser.entity";
import { Entity } from "typeorm";
import { AchievementEntity } from "../../achievement/entities/achievement.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('achievement_unlocked')
export class AchievementUnlockedEntity{
    id: number;
    achievement_id: AchievementEntity;
    game_user_id: GameUserEntity;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deteled_at: Date;
}