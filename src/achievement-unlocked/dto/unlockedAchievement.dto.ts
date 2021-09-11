import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class UnlockedAchievementDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'ID ACHIEVEMENT',
        default: '1',
    })
    readonly achievement_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'ID USER',
        default: '1',
    })
    readonly user_id: number;

}

