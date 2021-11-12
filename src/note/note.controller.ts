import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private readonly _noteService: NoteService){}

    @Post('')
    async store(@Body() createNoteDto: CreateNoteDto){
        return await this._noteService.store(createNoteDto);
    }

    @Get('')
    async index(){
        return await this._noteService.index();
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        return await this._noteService.delete(id);
    }

    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() updateNoteDto: UpdateNoteDto,
        ){
        return await this._noteService.update(id, updateNoteDto);
    }
}
