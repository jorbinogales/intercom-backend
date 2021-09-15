import { AchievementEntity } from "src/achievement/entities/achievement.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
    Entity
} from "typeorm";

@Entity('game')
export class GameEntity {

    id: number;
    category_value: any;
    achievements_value: AchievementEntity[];
    screenshots_value: [];
    title: string;
    description: string;
    icon: string;
    image: string;
    google_play: string;
    play_store: string;
    oculus_store: string;
    status: number;
    populity: number;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
