import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeopleDto } from './dto/createPeople.dto';
import { PeopleEntity } from './entities/people.entity';
import { PeopleRepository } from './repository/people.repository';

@Injectable()
export class PeopleService {
    constructor(@InjectRepository(PeopleRepository)
                private readonly peopleRepository: PeopleRepository) { }
    
    /* STORE [ PUBLIC ]*/
    async store(createPeopleDto: CreatePeopleDto): Promise<any>{
        const { email } = createPeopleDto;
        const people = await this.showByEmail(email);
        if (!people) {
            return await this.peopleRepository.store(createPeopleDto);
        }
        return {
            statusCode: 200,
            people,
        }
    }

    /* INDEX [ PUBLIC ] */
    async index(): Promise<PeopleEntity[]>{
        return await this.peopleRepository.find({
            relations: ['questions']
        });
    }

    /* SHOW ONE  PEOPLE [ PUBLIC ] */
    async show(people_id: number): Promise<PeopleEntity>{
        const resp = await this.peopleRepository.findOne({
            where: { id: people_id },
            relations: ['questions']
        });
        if (!resp) {
            throw new NotFoundException;
        }
        return resp;
    }

    /* SHOW USER BY EMAIL */
    async showByEmail(email: string): Promise<PeopleEntity>{
        return await this.peopleRepository.findOne({
            where: { email: email },
            relations: ['questions']
        });
    }

    /* CHECK PEOPLE EXIST */
    async check(people_id: number): Promise<PeopleEntity>{
        const resp = await this.show(people_id);
        if (!resp) {
            throw new NotFoundException;
        }
        return resp;
    }

}
