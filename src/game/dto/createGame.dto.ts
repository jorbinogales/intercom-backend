import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsBooleanString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';


export class CreateGameDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id category', default: 1})
    readonly category_id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty({ type: 'string', description: 'name category', default: 'Warcarft'})
    readonly title: string;

    @IsString()
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

    @IsBooleanString()
    @IsOptional()
    @ApiProperty({ type: 'boolean', description: 'Game Status', default: 1})
    readonly status: boolean;

    @IsBooleanString()
    @IsOptional()
    @ApiProperty({ type: 'boolean', description: 'Game populity', default: 0})
    readonly populity: boolean;

}

