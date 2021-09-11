import { ApiProperty } from '@nestjs/swagger';
import { isBoolean, IsBoolean, IsBooleanString, isBooleanString, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';


export class UpdateGameDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'number', description: 'id category', default: 1})
    readonly category_id: number;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty({ type: 'string', description: 'name category', default: 'Warcarft'})
    readonly title: string;

    @IsString()
    @IsOptional()
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
    @ApiProperty({ type: 'boolean', description: 'Game Status', default: "true"})
    readonly status: boolean;

    @IsBooleanString()
    @IsOptional()
    @ApiProperty({ type: 'boolean', description: 'Game populity', default: "false"})
    readonly populity: boolean;
    
}


