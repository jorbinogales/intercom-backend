import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from './repository/note.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([NoteRepository])
  ],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
