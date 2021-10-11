import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from './../user/entities/user.entity';
import { RegisterLawyerDto } from './dto/registerLawyer.dto';
import { UserService } from 'src/user/user.service';
import { LawyerService } from 'src/lawyer/lawyer.service';
import { RoleService } from 'src/role/role.service';
import { Roles } from './enum/roles';
import { LoginLawyerDto } from './dto/loginLawyer.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly lawyerService: LawyerService,
        private readonly roleService: RoleService,
    ) { }

    async register(registerLawyerDto: RegisterLawyerDto): Promise<any>{
        const user = await this.userService.store(registerLawyerDto)
        await this.lawyerService.store(user, registerLawyerDto);
        await this.roleService.store(user, Roles.Lawyer);
        return await this.validateUser(user.id).then((userData) => {
            const token = this.createToken(userData);
            return {
                statusCode: 200,
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
            statusCode: 200,
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
                statusCode: 200
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
                statusCode: 200
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
