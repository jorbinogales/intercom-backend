import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../enum/roles';



export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'id_azure', default: 'swager123'})
    id_azure: string;

    @IsString()
    @ApiProperty({ type: 'string', description: 'name', default: 'swagger'})
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: 'email', description: 'email', default: 'swagger@gmail.com'})
    email: string;

    @IsString()
    @ApiProperty({ type: 'string', description: 'avatar', default: 'swagger.png'})
    avatar: string;
    

    @IsEnum(Roles)
    @IsOptional()
    @ApiProperty({ type: 'enum', description: 'role user', default: "2"})
    role: Roles
}

