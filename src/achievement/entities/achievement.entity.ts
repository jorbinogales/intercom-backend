import { Entity } from "typeorm";
import { AchievementUnlockedEntity } from "../../achievement-unlocked/entities/achievement-unlocked.entity";
import { GameEntity } from "../../game/entities/game.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { TypeAchievementModel } from "../model/achievement.model";

@Entity('achievement')
export class AchievementEntity{
    id: number;
    code: string;
    game_value: GameEntity;
    name: string;
    icon: string;
    description: string;
    type: TypeAchievementModel;
    achievement_value: AchievementUnlockedEntity[];
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}