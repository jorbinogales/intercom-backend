import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterLawyerDto } from 'src/auth/dto/registerLawyer.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateLawyerDto } from './dto/updateLawyer.dto';
import { LawyerEntity } from './entities/lawyer.entity';
import { LawyerRepository } from './repository/lawyer.repository';

@Injectable()
export class LawyerService {
    constructor(
            @InjectRepository(LawyerRepository)
            private readonly _lawyerRepository: LawyerRepository,
    ) { }

    /* STORE */
    async store(
        user: UserEntity,
        _registerLawyerDto: RegisterLawyerDto
    ): Promise<any>{
        return await this._lawyerRepository.store(user, _registerLawyerDto);
    }

    /* INDEX */
    async index(): Promise<LawyerEntity[]>{
        return await this._lawyerRepository.find({
            order: { created_at: 'DESC'},
            relations: ['answerings', 'user_id'],
        });
    }

    /* GET ONE LAWYER */
    async getOne(id:number): Promise<LawyerEntity>{
        return await this._lawyerRepository.findOne({
            relations: ['answerings', 'user_id'],
        });
    }

    
    /* UPDATE */
    async update(user_id: number, _updateLawyerDto: UpdateLawyerDto): Promise<LawyerEntity[]>{
        const lawyer = await this.getByIdUser(user_id);
        return await this._lawyerRepository.updateLawyer(lawyer, _updateLawyerDto);
    }

    /* GET */
    async get(lawyer_id: number): Promise<any> {
        const lawyer = await this._lawyerRepository.findOne({
            where: { id: lawyer_id }
        });
        if (!lawyer) {
            throw new NotFoundException(`No se encuentra el abogado con ${lawyer_id} registrado`)
        }
        return lawyer;
    }

    async getByIdUser(user_id: number): Promise<any> {
        const lawyer = await this._lawyerRepository.findOne({
            where: { user_id: user_id },
            relations: ['answerings']
        });
        if (!lawyer) {
            throw new NotFoundException(`No se encuentra el abogado con ${user_id} registrado`)
        }
        return lawyer;
     }

    
}
