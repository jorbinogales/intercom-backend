
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterLawyerDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    provide: string;

    @IsString()
    @IsOptional()
    photoUrl: string;


}

