import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,  IsString } from 'class-validator';


export class createGameUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id category', default: 1})
    readonly user_id: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'name category', default: 1})
    readonly game_id: number;
}


