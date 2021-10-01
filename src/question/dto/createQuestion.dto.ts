import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class CreateQuestionDto{

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    people_id: number;

}