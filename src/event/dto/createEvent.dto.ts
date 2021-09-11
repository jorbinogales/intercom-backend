import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsFullWidth, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';


export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'number', description: 'id game', default: 1})
    readonly game_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @ApiProperty({ type: 'string', description: 'name event', default: 'nombre del evento'})
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    @ApiProperty({ type: 'string', description: 'descritpion event', default: 'esta es la descripcion de algu evento'})
    readonly description: string;
    
}


