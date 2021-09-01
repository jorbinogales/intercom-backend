import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'name category', default: 'Accion'})
    readonly name: string;
}

