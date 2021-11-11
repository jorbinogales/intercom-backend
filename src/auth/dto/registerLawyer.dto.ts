
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterLawyerDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

