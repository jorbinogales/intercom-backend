import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { PeopleModule } from 'src/people/people.module';
import { UserModule } from 'src/user/user.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { questionRepository } from './repository/question.repository';

@Module({
  imports: [
    UserModule,
    MailModule,
    PeopleModule,
    TypeOrmModule.forFeature([questionRepository])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
