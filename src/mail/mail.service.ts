import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
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
                context: {
                    null: null,
                }
            });
            if (!mail) {
                throw new BadRequestException('Email not send');
            }
            return {
                statusCode: 201,
            }
        } catch {
            return { 
                statusCode: 201,
            }
        }
  }
}