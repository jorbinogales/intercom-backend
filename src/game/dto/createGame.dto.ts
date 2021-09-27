import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, IsBooleanString, IsNumberString, IsBoolean } from 'class-validator';


export class CreateGameDto {

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({ type: 'number', description: 'id category', default: 1})
    readonly category_id: number;

    @IsString({ message: 'Nombre es requerido'})
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty({ type: 'string', description: 'name category', default: 'Warcarft'})
    readonly title: string;

    @IsString({ message: 'Descripcion es requerido'})
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    @ApiProperty({ type: 'string', description: 'description of category', default: 'A mediaval strategy game'})
    readonly description: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of google play', default: 'http://googleplay.com/152151'})
    readonly google_play: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of play store', default: 'http://playstore.com/152151'})
    readonly play_store: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of oculos store', default: 'http://oculosstore.com/das152512'})
    readonly oculus_store: string;

    @IsBooleanString({ message: 'Estatus es requerido'})
    @IsOptional()
    @ApiProperty({ type: 'boolean', description: 'Game Status', default: "true" })
    readonly status: boolean;

    @IsBooleanString({ message: 'Estatus es requerido'})
    @IsOptional()
    @ApiProperty({ type: 'boolean', description: 'Game populity', default: "false" })
    readonly populity: boolean;

}

