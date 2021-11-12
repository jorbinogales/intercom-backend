
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateNoteDto {
 
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly note1: number;

    @IsNumber()
    @IsNotEmpty()
    readonly note2: number;

    @IsNumber()
    @IsNotEmpty()
    readonly note3: number;

    @IsNumber()
    @IsNotEmpty()
    readonly note4: number;

}
