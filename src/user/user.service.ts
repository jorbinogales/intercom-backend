import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterLawyerDto } from 'src/auth/dto/registerLawyer.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly UserRepository: UserRepository,
    ) { }
    
    /* STORE */
    async store(registerLawyerDto: RegisterLawyerDto): Promise<any>{
        const { email } = registerLawyerDto;
        await this.findByEmail(email);
        return await this.UserRepository.store(registerLawyerDto);
    }

    async index(): Promise<any>{
        return await this.UserRepository.find();
    }

    /* GET */
    async get(user_id: number): Promise<UserEntity>{
        return await this.UserRepository.findOne({
            where: { id: user_id },
            relations: ['roles'],
        });
    }

    /* FIND USER BY EMAIL */
    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.UserRepository.findOne({
            where: { email: email },
        });
        if (user) {
            throw new BadRequestException('El correo electronico ya existe');
        }
        return null;
    }
}
