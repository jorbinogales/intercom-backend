import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ConfigurationModule } from './configuration/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigurations } from './utils/database/database';
import { NoteModule } from './note/note.module';
require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({ path: `environment/.env.${process.env.NODE_ENV}`, safe: true }),
    TypeOrmModule.forRootAsync(DatabaseConfigurations),
    ConfigurationModule,
    NoteModule,
  ],
})
export class AppModule {}
