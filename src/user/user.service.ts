import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginLawyerDto } from 'src/auth/dto/loginLawyer.dto';
import { RegisterLawyerDto } from 'src/auth/dto/registerLawyer.dto';
import { MailService } from 'src/mail/mail.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mailService:  MailService,
    ) { }
    
    /* STORE */
    async store(registerLawyerDto: RegisterLawyerDto): Promise<any>{
        const { email } = registerLawyerDto;
        await this.findByEmail(email);
        const user = await this._userRepository.store(registerLawyerDto);
        await this._mailService.sendRegisterInfo(user);
        return user;
    }

    async index(): Promise<any>{
        return await this._userRepository.find();
    }

    /* LOGIN USER */
    async login(loginLawyerDto: LoginLawyerDto): Promise<UserEntity>{
        const { email, password } = loginLawyerDto;
        return await this._userRepository.findOne({
            where: { email: email, password: password }
        });
    }

    /* GET */
    async get(user_id: number): Promise<UserEntity>{
        return await this._userRepository.findOne({
            where: { id: user_id },
            relations: ['roles', 'lawyer_id'],
        });
    }

    /* FIND USER BY EMAIL */
    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this._userRepository.findOne({
            where: { email: email },
        });
        if (user) {
            throw new BadRequestException('El correo electronico ya existe');
        }
        return null;
    }
}
