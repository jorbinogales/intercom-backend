import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnsweringDto{
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    question_id: number;
}