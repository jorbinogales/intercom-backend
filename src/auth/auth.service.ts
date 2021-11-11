import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from './../user/entities/user.entity';
import { RegisterLawyerDto } from './dto/registerLawyer.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { Roles } from './enum/roles';
import { LoginLawyerDto } from './dto/loginLawyer.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
    ) { }

    async register(registerLawyerDto: RegisterLawyerDto): Promise<any>{
        const { password, repeat_password } = registerLawyerDto;
        
        if(password != repeat_password){
            throw new BadRequestException('El password no coincide');
        }

        const user = await this.userService.store(registerLawyerDto);
        await this.roleService.store(user, Roles.USER);
        return await this.validateUser(user.id).then((userData) => {
            const token = this.createToken(userData);
            return {
                statusCode: 201,
                access_token: token,
            }
        }); 
    }

    /* LOGIN */
    async login(loginLawyerDto: LoginLawyerDto): Promise<any>{
        const user = await this.userService.login(loginLawyerDto);
        if (!user) {
            throw new NotFoundException('Usuario no registrado')
        }
        const token = this.createToken(user);
        return {
            statusCode: 201,
            access_token: token,
            user: user,
        }
    }

    async validateUser(id: number): Promise<UserEntity>{
        const user = await this.userService.get(id);
        if (!user) {
            return null;
        }
        return user;
    }
    

    
    async profile(id: number): Promise<UserEntity>{
        return await this.validateUser(id);
    }

    /* REFRESH TOKEN */
    async refresh(token: string): Promise<any>{
        const payload = this.jwtService.verify(token);
        if (!payload) {
            throw new UnauthorizedException;
        }
       return await this.validateUser(payload.id).then((userData) => {
            const Token = this.createToken(userData);
            return {
                userData,
                access_token: Token,
                statusCode: 201
            }
        }); 
    }

     /* REFRESH TOKEN */
    async logout(token: string): Promise<any>{
        const payload = this.jwtService.verify(token);
        if (!payload) {
            throw new UnauthorizedException;
        }
       return await this.validateUser(payload.id).then((userData) => {
            const Token = this.createToken(userData);
            return {
                userData,
                access_token: Token,
                statusCode: 201
            }
        }); 
    }

  
    createToken(userData: any) {
        const payload = {
            id: userData.id,
            email: userData.email,
            password: userData.password,
        };
        return this.jwtService.sign(payload);
    }


}
