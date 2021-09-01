import { AchievementEntity } from "src/achievement/entities/achievement.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
    Entity
} from "typeorm";

@Entity('game')
export class GameEntity{

    id: number;
    category: CategoryEntity;
    achievements: AchievementEntity[];
    title: string;
    description: string;
    icon: string;
    picture: string;
    googlePlay: string;
    playStore: string;
    oculusStore: string;
    status: boolean;
    populity: boolean;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

}