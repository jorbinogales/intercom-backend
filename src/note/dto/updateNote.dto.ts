
import {
    IsOptional,
    IsNumber,
    IsString,
  } from 'class-validator';
  
  export class UpdateNoteDto {
   
      @IsString()
      @IsOptional()
      readonly nombre: string;
  
      @IsNumber()
      @IsOptional()
      readonly note1: number;
  
      @IsNumber()
      @IsOptional()
      readonly note2: number;
  
      @IsNumber()
      @IsOptional()
      readonly note3: number;
  
      @IsNumber()
      @IsOptional()
      readonly note4: number;
  
  }
  