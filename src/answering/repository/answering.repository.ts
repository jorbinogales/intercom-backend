import { LawyerEntity } from "src/lawyer/entities/lawyer.entity";
import { QuestionEntity } from "src/question/entities/question.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateAnsweringDto } from "../dto/createAnswering.dto";
import { AnsweringEntity } from "../entities/answering.entity";

@EntityRepository(AnsweringEntity)
export class AnsweringRepository extends Repository<AnsweringEntity>{

    /* STORE */
    async store(
        lawyer: LawyerEntity,
        question: QuestionEntity,
        _createAnswerginDto: CreateAnsweringDto
    ): Promise<any> {
        const { text } = _createAnswerginDto;
        const answering = this.create({
            text: text,
            lawyer_id: lawyer,
            question_id: question,
        });

        await this.save(answering);
        return {
            statusCode: 200,
        };
    }
}