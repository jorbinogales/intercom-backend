import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsUrl } from 'class-validator';
import { FileModelName } from '../model/file.model';


export class UploadFileDto {
    
    @IsNumberString()
    @ApiProperty({ type: 'number', description: 'id category', default: 1})
    readonly entity_id: number;

    @IsEnum(FileModelName)
    @ApiProperty({
        type: 'enum',
        enum: [FileModelName],
        description: 'type of entity',
        default: FileModelName.GAME
    })
    readonly entity_name: FileModelName;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of oculos store', default: 'http://image.com/das152512'})
    readonly icon_url: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of oculos store', default: 'http://image.com/das152512'})
    readonly image_url: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of oculos store', default: 'http://image.com/das152512'})
    readonly avatar_url: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Url of oculos store', default: 'http://image.com/das152512'})
    readonly screenshots_url: string[];

}

