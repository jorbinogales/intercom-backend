import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LawyerService } from 'src/lawyer/lawyer.service';
import { MailService } from 'src/mail/mail.service';
import { QuestionService } from 'src/question/question.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAnsweringDto } from './dto/createAnswering.dto';
import { AnsweringEntity } from './entities/answering.entity';
import { AnsweringRepository } from './repository/answering.repository';

@Injectable()
export class AnsweringService {
    constructor(
        @InjectRepository(AnsweringRepository)
        private readonly _answeringRepository: AnsweringRepository,
        private readonly _lawyerService: LawyerService,
        private readonly _questionService: QuestionService,
        private readonly _userService: UserService,
        private readonly _mailService: MailService,
    ) { }
    
    /* STORE */
    async store(
        user: number,
        _createAnswerginDto: CreateAnsweringDto,
    ): Promise<any>{
        const { question_id } = _createAnswerginDto;
        const lawyer = await this._lawyerService.getByIdUser(user);
        const question = await this._questionService.get(question_id);
        return await this._answeringRepository.store(lawyer, question, _createAnswerginDto);
    }

    /* LAST ANSWERING */
    async lastAnswering(): Promise<AnsweringEntity[]>{
        const answering =
            await this._answeringRepository.createQueryBuilder('answering')
                .leftJoinAndSelect('answering.lawyer_id', 'lawyer')
                .getMany();
            

        return answering;
    }

    /* COUNT */
    async count(): Promise<number>{
        return await this._answeringRepository.count();
    }
}
