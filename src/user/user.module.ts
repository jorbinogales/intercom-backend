import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
