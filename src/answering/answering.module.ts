import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LawyerModule } from 'src/lawyer/lawyer.module';
import { MailModule } from 'src/mail/mail.module';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';
import { AnsweringController } from './answering.controller';
import { AnsweringService } from './answering.service';
import { AnsweringRepository } from './repository/answering.repository';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LawyerModule,
    QuestionModule,
    MailModule,
    TypeOrmModule.forFeature([AnsweringRepository])
  ],
  controllers: [AnsweringController],
  providers: [AnsweringService],
  exports: [AnsweringService],
})
export class AnsweringModule {}
