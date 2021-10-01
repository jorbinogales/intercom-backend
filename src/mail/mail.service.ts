import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendRegisterInfo(user: UserEntity) {
        const mail = await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './registro', 
            context: { 
                email: user.email,
            },
        });
        if (!mail) {
            throw new BadRequestException('Email not send');
        }
        return {
            statusCode: 200,
        }
  }
    
    async sendquestion(question: QuestionEntity, Users: UserEntity[]) {
        Users.map(async (user) => {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './question', 
                context: { // ✏️ filling curly brackets with content
                    question: question
                },
            });
        })
        return {
            statusCode: 200,
        }
  }
}