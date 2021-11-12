
import { EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/createNote.dto';
import { UpdateNoteDto } from '../dto/updateNote.dto';
import { NoteEntity } from '../entities/note.entity';

@EntityRepository(NoteEntity)
export class NoteRepository extends Repository<NoteEntity> {

    /* STORE */
    async store(createNoteDto: CreateNoteDto): Promise<any>{
        const { nombre, note1, note2, note3, note4 } = createNoteDto;
        const promedio = (note1 + note2+ note3+ note4) / 4;
        const note = this.create({
            nombre: nombre,
            note1: note1,
            note2: note2,
            note3: note3,
            note4: note4,
            promedio: promedio,
        });
        const resp = await this.save(note);
        return { 
            statusCode: 200,
            resp
        }
    }

    /* UPDATE */
    async updateNote(note: NoteEntity, updateNoteDto: UpdateNoteDto): Promise<any>{
        const { nombre, note1, note2, note3, note4 } = updateNoteDto;

        if(note.nombre){
            note.nombre = nombre
        }
        if(note1){
            note.note1 = note1;
        }
        if(note2){
            note.note2 = note2;
        }
        if(note3){
            note.note3 = note3;
        }
        if(note4){
            note.note4 = note4;
        };

        const promedio = (note.note1 + note.note2 + note.note3 + note.note4)/4;
        note.promedio = promedio;
        console.log(note);
        const resp = await this.save(note);
        return { 
            resp,
            statusCode: 200,
        }
    }
}
