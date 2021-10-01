import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LawyerService } from 'src/lawyer/lawyer.service';
import { QuestionService } from 'src/question/question.service';
import { CreateAnsweringDto } from './dto/createAnswering.dto';
import { AnsweringRepository } from './repository/answering.repository';

@Injectable()
export class AnsweringService {
    constructor(
        @InjectRepository(AnsweringRepository)
        private readonly _answeringRepository: AnsweringRepository,
        private readonly _lawyerService: LawyerService,
        private readonly _questionService: QuestionService
    ) { }
    
    /* STORE */
    async store(
        _createAnswerginDto: CreateAnsweringDto,
    ): Promise<any>{
        const { lawyer_id, question_id } = _createAnswerginDto;
        const lawyer = await this._lawyerService.get(lawyer_id);
        const question = await this._questionService.get(question_id);
        return await this._answeringRepository.store(lawyer, question, _createAnswerginDto);
    }
}
