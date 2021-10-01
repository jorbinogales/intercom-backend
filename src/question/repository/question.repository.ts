import { PeopleEntity } from "src/people/entities/people.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateQuestionDto } from "../dto/createQuestion.dto";
import { QuestionEntity } from "../entities/question.entity";

@EntityRepository(QuestionEntity)
export class questionRepository extends Repository<QuestionEntity>{

    /* STORE */
    async store(
        createQuestionDto: CreateQuestionDto,
        people: PeopleEntity
    ): Promise<QuestionEntity>{
        const { text } = createQuestionDto;
        const question = this.create({
            text: text,
            people_id: people,
        });
        const resp = await this.save(question);
        return resp;
    }
}