import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AnsweringEntity } from 'src/answering/entities/answering.entity';
import { PeopleEntity } from 'src/people/entities/people.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

    async sendRegisterInfo(user: UserEntity) {
        try {
            const mail = await this.mailerService.sendMail({
                to: user.email,
                subject: 'Bienvenido, Abogado.',
                template: './registro',
            });
            if (!mail) {
                throw new BadRequestException('Email not send');
            }
            return {
                statusCode: 200,
            }
        } catch {
            return { 
                statusCode: 200,
            }
        }
  }
    
    async sendquestion(question: QuestionEntity, Users: UserEntity[]) {
        Users.map(async (user) => {
            const mail = await this.mailerService.sendMail({
                to: user.email,
                subject: 'Un nuevo cliente necesita una RESPUESTAS.',
                template: './question', 
                context: { 
                    question: question
                },
            });
            console.log(mail);
        })
        return {
            statusCode: 200,
        }
  }

    async sendAnswering(answering: AnsweringEntity, People: PeopleEntity) {
        try {
            const mail = await this.mailerService.sendMail({
                to: People.email,
                subject: 'Un abogado te ha enviado una respuesta.',
                template: './answering',
                 context: { 
                    question: answering
                },
            });
            if (!mail) {
                throw new BadRequestException('Email not send');
            }
            return {
                statusCode: 200,
            }
        } catch {
            return { 
                statusCode: 200,
            }
        }
  }
}