import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';


export class CreateScoreDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id leader_board', default: 1})
    readonly  leaderboard_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id user', default: 1})
    readonly user_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'number', description: 'number of score', default: 500})
    readonly value: number;
    
}



