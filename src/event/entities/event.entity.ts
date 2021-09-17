
import { Entity } from "typeorm";
import { GameEntity } from "../../game/entities/game.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('event')
export class EventEntity{
    id: string;
    code: string;
    game_value: GameEntity;
    icon: string;
    name: string;
    description: string;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}