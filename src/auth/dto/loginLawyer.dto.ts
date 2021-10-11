import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginLawyerDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}