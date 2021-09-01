
import { Entity } from "typeorm";
import { GameEntity } from "../../game/entities/game.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('event')
export class EventEntity{
    id: string;
    game: GameEntity;
    name: string;
    description: string;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}