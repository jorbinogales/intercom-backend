import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TypeAchievementModel } from '../model/achievement.model';


export class CreateAchievementDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'id of game',
        default: '1'
    })
    readonly game_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @ApiProperty({
        type: 'string',
        description: 'name of achievement',
        default: 'Ganar 100 oro'
    })
    readonly name: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(500)
    @ApiProperty({
        type: 'string',
        description: 'description of achievement',
        default: 'Gana 100 oro desde cualquier medio'
    })
    readonly description: string;

    
    @IsEnum(TypeAchievementModel)
    @ApiProperty({
        type: 'enum',
        enum: [TypeAchievementModel],
        description: 'type of achievement',
        default: TypeAchievementModel.normal
    })
    readonly type: TypeAchievementModel;
}
