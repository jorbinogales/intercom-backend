import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { FileModule } from './file/file.module';
import { ConfigurationModule } from './configuration/config.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigurations } from './utils/database/database';
import { RoleModule } from './role/role.module';
import { MailModule } from './mail/mail.module';
import { DespachoModule } from './despacho/despacho.module';
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
    MailModule,
    DespachoModule,
  ],
})
export class AppModule {}
