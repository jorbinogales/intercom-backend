import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterLawyerDto } from 'src/auth/dto/registerLawyer.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { LawyerRepository } from './repository/lawyer.repository';

@Injectable()
export class LawyerService {
    constructor(
            @InjectRepository(LawyerRepository)
            private readonly _lawyerRepository: LawyerRepository
    ) { }
    
    async store(
        user: UserEntity,
        _registerLawyerDto: RegisterLawyerDto
    ): Promise<any>{
        return await this._lawyerRepository.store(user, _registerLawyerDto);
    }

    async get(lawyer_id: number): Promise<any> {
        const lawyer = await this._lawyerRepository.findOne({
            where: { id: lawyer_id }
        });
        if (!lawyer) {
            throw new NotFoundException(`No se encuentra la pregunta con ${lawyer_id} registrada`)
        }
        return lawyer;
    }
    
}
