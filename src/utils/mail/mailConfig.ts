import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as path from "path";

export const MailConfiguration: MailerAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        return {
           transport: {
                host: configService.get<string>('MAIL_HOST'),
                secure: configService.get<boolean>('MAIL_SECURE'),
                auth: {
                user: configService.get<string>('MAIL_USER'),
                pass: configService.get<string>('MAIL_PASS'),
                },
                port: configService.get<number>('MAIL_PORT'),
                encoding: configService.get<string>('MAIL_ENCODING'),
            },
            defaults: {
                from: configService.get<string>('MAIL_NAME'),
            },
            template: {
                dir: path.join(__dirname, 'mail/templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                strict: true,
                },
            },
        }
    }
}