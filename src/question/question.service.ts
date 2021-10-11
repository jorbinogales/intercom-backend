import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { AnsweringEntity } from 'src/answering/entities/answering.entity';
import { LawyerEntity } from 'src/lawyer/entities/lawyer.entity';
import { LawyerService } from 'src/lawyer/lawyer.service';
import { MailService } from 'src/mail/mail.service';
import { PeopleEntity } from 'src/people/entities/people.entity';
import { PeopleService } from 'src/people/people.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionEntity } from './entities/question.entity';
import { questionRepository } from './repository/question.repository';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(questionRepository)
        private readonly _questionRepository: questionRepository,
        private readonly _peopleService: PeopleService,
        private readonly _mailService: MailService,
        private readonly _userService: UserService,
        private readonly _lawyerService: LawyerService,
    ) { }
    
    /* STORE */
    async store(createQuestionDto: CreateQuestionDto): Promise<any> {
        const { people_id } = createQuestionDto;
        const people: PeopleEntity = await this._peopleService.check(people_id);
        const question = await this._questionRepository.store(createQuestionDto, people);
        const users = await this._userService.index();
        return await this._mailService.sendquestion(question, users);
    }

    /* INDEX */
    async index(): Promise<QuestionEntity[]> {
        return await this._questionRepository.find({
            relations: ['answerings', 'people_id'],
        });
    }

    /* GET ONE QUESTION */
    async get(question_id: number): Promise<QuestionEntity> {
        const question = await this._questionRepository.findOne({
            where: { id: question_id },
            relations: ['answerings', 'people_id']
        })
        if (!question) {
            throw new NotFoundException(`No se encuentra la pregunta con ${question_id} registrada`)
        }
        return question;
    }

    /* GET ALL QUESTION FROM PEOPLE */
    async getFromPeople(people_id: number): Promise<QuestionEntity[]> {
        return await this._questionRepository.find({
            where: { people_id: people_id },
            relations: ['answerings', 'people_id'],
        });
    }

    /* COUNT */
    async count(): Promise<number> {
        return await this._questionRepository.count();
    }

    /* GET ALL QUESTION WITHOUT ANSWERING */
    async new(user_id: number): Promise<any>{


       const lawyer: LawyerEntity = await this._lawyerService.getByIdUser(user_id);
        const questions = await this._questionRepository.find({
            relations: ['answerings'],
        });
        
        const question_array = [];
        questions.map(async (question) => {
            const answerings = question.answerings;
            console.log(answerings);
            if (answerings.length == 0) {
                question_array.push(question);
            } else {
                let contestado: boolean = false;
                answerings.map(async (answering) => {
                    if (answering.lawyer_id.id == lawyer.id) {
                        contestado =  true;
                    }
                })
                if (contestado === false) {
                    question_array.push(question);
                }
            }
        })
        

        return question_array;
    }

    async old(user_id: number): Promise<any>{
        const lawyer: LawyerEntity = await this._lawyerService.getByIdUser(user_id);
        const answering = await this._questionRepository.createQueryBuilder('question')
                            .leftJoinAndSelect('question.answerings', 'answerings')
                            .where('answerings.lawyer_id = :lawyer', {
                                lawyer: lawyer.id,
                            })
                            .getMany();
        return answering;
    }
}
