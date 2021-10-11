import { EntityRepository, Repository } from "typeorm";
import { CreatePeopleDto } from "../dto/createPeople.dto";
import { PeopleEntity } from "../entities/people.entity";

@EntityRepository(PeopleEntity)
export class PeopleRepository extends Repository<PeopleEntity>{

    /* STORE PEOPLE */
    async store(createPeopleDto: CreatePeopleDto): Promise<any>{
        const { email } = createPeopleDto;
        let people = this.create({
            email: email
        })
        people = await this.save(people)
        return {
            status: 200,
            people
        }
    }
}