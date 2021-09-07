import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('MICRO-ADMIN') private readonly microAdmin: ClientProxy,
        @Inject('MICRO-DEV') private readonly microDev: ClientProxy,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(id_azure: string, microservice: string): Promise<UserEntity>{
        try {
            let user: UserEntity;
            if (microservice === 'MICRO-DEV') {
                user = await this.microDev.send({ cmd: 'user_get' }, { id_azure }).toPromise();
            } else {
                user = await this.microAdmin.send({ cmd: 'admin_get' }, { id_azure }).toPromise();
            }
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }

    
    async profile(id: string, microservice: string): Promise<UserEntity>{
        let user: UserEntity;
        if (microservice === 'MICRO-DEV') {
            user = await this.microDev.send({ cmd: 'user_get_id' }, { id }).toPromise();
        } else {
            user = await this.microAdmin.send({ cmd: 'admin_get_id' }, { id }).toPromise();
        }
        if (!user) {
            throw new NotFoundException(`not found user with id ${id}`);
        }
        return user;
    }

    async login(createUserDto: CreateUserDto): Promise<any>{
        const { id_azure } = createUserDto;
        const user = await this.validateUser(id_azure, 'MICRO-DEV');
        if (!user) {
            await this.microDev.send({ cmd: 'user_store' }, { createUserDto }).toPromise();
        }
        return await this.validateUser(id_azure, 'MICRO-DEV').then((userData) => {
            const Token = this.createToken(userData, 'MICRO-DEV');
            return {
                access_token: Token,
                statusCode: 200
            }
        }); 
    }

    async AdminLogin(createUserDto: CreateUserDto): Promise<any>{
        const { id_azure } = createUserDto;
        const user = await this.validateUser(id_azure, 'MICRO-ADMIN');
        if (!user) {
            await this.microAdmin.send({ cmd: 'admin_store' }, { createUserDto }).toPromise();
        }
        return await this.validateUser(id_azure, 'MICRO-ADMIN').then((userData) => {
            const Token = this.createToken(userData, 'MICRO-ADMIN');
            return {
                access_token: Token,
                statusCode: 200
            }
        }); 
    }

  
    createToken(userData: any, microservice: string) {
        const payload = {
            'id': userData.id,
            'microservice': microservice,
        };
        return this.jwtService.sign(payload);
    }


}
