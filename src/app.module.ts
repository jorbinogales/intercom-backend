import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { FileModule } from './file/file.module';
import { ConfigurationModule } from './configuration/config.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigurations } from './utils/database/database';
import { RoleModule } from './role/role.module';
import { LawyerModule } from './lawyer/lawyer.module';
import { PeopleModule } from './people/people.module';
import { QuestionModule } from './question/question.module';
import { AnsweringModule } from './answering/answering.module';
import { MailModule } from './mail/mail.module';
require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({ path: `environment/.env.${process.env.NODE_ENV}`, safe: true }),
    TypeOrmModule.forRootAsync(DatabaseConfigurations),
    ConfigurationModule,
    AuthModule,
    FileModule,
    UserModule,
    RoleModule,
    LawyerModule,
    PeopleModule,
    QuestionModule,
    AnsweringModule,
    MailModule,
  ],
    
})
export class AppModule {}
