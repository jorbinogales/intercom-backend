
import { GameUserEntity } from "src/game-user/entities/gameUser.entity";
import { Entity} from "typeorm";
import { LeaderBoardEntity } from "../../leaderboard/entities/leaderboard.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('score')
export class ScoreEntity{
    id: string;
    leaderboard_id: LeaderBoardEntity;
    game_user_id: GameUserEntity[];
    value: number;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

}