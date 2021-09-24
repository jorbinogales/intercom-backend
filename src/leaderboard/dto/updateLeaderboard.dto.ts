import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OrderLeaderBoardModel, TypeLeaderBoardModel } from '../model/leaderboard.model';

export class UpdateLeaderboardDto {

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        description: 'id of game',
        default: '1'
    })
    readonly game_id: number;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty({
        type: 'string',
        description: 'name of leaderboard',
        default: 'Copa de oro'
    })
    readonly name: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(500)
    @ApiProperty({
        type: 'string',
        description: 'description of leaderboard',
        default: 'Has ganado la copa oro'
    })
    readonly description: string;

    @IsEnum(TypeLeaderBoardModel)
    @IsOptional()
    @ApiProperty({
        type: 'enum',
        enum: [TypeLeaderBoardModel],
        description: 'type of achievement',
        default: TypeLeaderBoardModel.PUNTUATION
    })
    readonly type: TypeLeaderBoardModel;

    @IsEnum(OrderLeaderBoardModel)
    @IsOptional()
    @ApiProperty({
        type: 'enum',
        enum: [OrderLeaderBoardModel],
        description: 'ORrder of achievement',
        default: OrderLeaderBoardModel.ASC
    })
    readonly order: OrderLeaderBoardModel;

    

}
