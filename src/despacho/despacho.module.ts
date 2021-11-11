import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { DespachoRepository } from './repository/despacho.repository';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([DespachoRepository])
  ],
})
export class DespachoModule {}
