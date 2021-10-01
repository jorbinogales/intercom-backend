import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePeopleDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
}




