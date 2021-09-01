
import { GameUserEntity } from "src/game-user/entities/gameUser.entity";
import { Entity } from "typeorm";
import { EventEntity } from "../../event/entities/event.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('event_player')
export class EventPlayerEntity{
    id: string;
    event: EventEntity;
    game_user_id: GameUserEntity;
    value: string;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

}