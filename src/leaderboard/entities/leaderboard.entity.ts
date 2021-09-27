import { Entity } from "typeorm";
import { GameEntity } from "../../game/entities/game.entity";
import { ScoreEntity } from "../../score/entities/score.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { OrderLeaderBoardModel, TypeLeaderBoardModel } from "../model/leaderboard.model";

@Entity('leader_board')
export class LeaderBoardEntity{

    id: string;
    score: string;
    game_value: GameEntity;
    scores: ScoreEntity[];
    name: string;
    icon: string;
    description: string;
    type: TypeLeaderBoardModel;
    order: OrderLeaderBoardModel;
    users: string;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

}