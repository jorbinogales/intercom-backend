import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { PeopleEntity } from 'src/people/entities/people.entity';
import { PeopleService } from 'src/people/people.service';
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
    ) { }
    
    /* STORE */
    async store(createQuestionDto: CreateQuestionDto): Promise<any>{
        const { people_id } = createQuestionDto;
        const people: PeopleEntity = await this._peopleService.check(people_id);
        const question = await this._questionRepository.store(createQuestionDto, people);
        const users = await this._userService.index();
        return await this._mailService.sendquestion(question, users);
    }

    /* INDEX */
    async index(): Promise<QuestionEntity[]>{
        return await this._questionRepository.find({
            relations: ['answerings', 'people_id'],
        });
    }

    /* GET ONE QUESTION */
    async get(question_id: number): Promise<QuestionEntity>{
        const question =  await this._questionRepository.findOne({
            where: {id: question_id},
            relations: ['answerings', 'people_id']
        })
        if (!question) {
            throw new NotFoundException(`No se encuentra la pregunta con ${question_id} registrada`)
        }
        return question;
    }

    /* GET ALL QUESTION FROM PEOPLE */
    async getFromPeople(people_id: number): Promise<QuestionEntity[]>{
        return await this._questionRepository.find({
            where: { people_id: people_id },
            relations: ['answerings', 'people_id'],
        });
    }
}
