import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { NoteEntity } from './entities/note.entity';
import { NoteRepository } from './repository/note.repository';

@Injectable()
export class NoteService {
    constructor(@InjectRepository(NoteRepository)
                private readonly _noteRepository: NoteRepository){}


    async store(createNoteDto: CreateNoteDto): Promise<any>{
        return await this._noteRepository.store(createNoteDto);
    }

    async index(): Promise<NoteEntity[]>{
        return await this._noteRepository.find({})
    }

    async get(id: number): Promise<NoteEntity>{
        return await this._noteRepository.findOne({
            where: { id}
        })
    }

    async getMany(id: number): Promise<NoteEntity[]>{
        return await this._noteRepository.find({
            where: { id}
        })
    }

    async delete(id: number): Promise<any[]>{
        const note = await this.getMany(id);
        return await this._noteRepository.remove(note);
    }

    async update(id: number, updateNoteDto: UpdateNoteDto): Promise<any>{
        const note = await this.get(id);
        return await this._noteRepository.updateNote(note, updateNoteDto)
    }

}
