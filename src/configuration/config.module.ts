import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigurationService } from './config.service';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_ENV: Joi.string()
                    .valid('development', 'production')
                    .default('development'),
            }),
        }),
    ],
    providers: [ConfigService, ConfigurationService],
    exports: [ConfigService, ConfigurationService],
})
export class ConfigurationModule { }