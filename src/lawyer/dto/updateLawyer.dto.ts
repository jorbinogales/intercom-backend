import { IsOptional, IsString } from "class-validator";


export class UpdateLawyerDto{

    @IsOptional()
    @IsString()
    name: string;
}