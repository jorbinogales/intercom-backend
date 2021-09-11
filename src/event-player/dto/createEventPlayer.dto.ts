import { ApiProperty } from '@nestjs/swagger';
import {  IsJSON, IsNotEmpty, IsString } from 'class-validator';


export class CreateEventPlayerDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id game', default: 1})
    readonly event_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id user', default: 1})
    readonly user_id: number;

    @IsJSON()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'json', default: "{ data: { user: 1, name: 'jose'}}"})
    readonly value: string;
    
}
