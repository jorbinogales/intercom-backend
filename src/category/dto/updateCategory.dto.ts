import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'name category', default: 'Ciencia Ficcion'})
    readonly name: string;
}

