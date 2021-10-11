import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConfiguration } from 'src/utils/mail/mailConfig';

@Module({
  imports: [
    MailerModule.forRootAsync(MailConfiguration),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}