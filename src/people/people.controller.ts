import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePeopleDto } from './dto/createPeople.dto';
import { PeopleEntity } from './entities/people.entity';
import { PeopleService } from './people.service';
import { PeopleRepository } from './repository/people.repository';

@Controller('people')
export class PeopleController {

    constructor(private readonly peopleService: PeopleService) { }
    
    /* STORE PEOPLE */
    @Post('')
    async store(@Body() createPeopleDto: CreatePeopleDto): Promise<any>{
        return await this.peopleService.store(createPeopleDto)
    }

    /* GET ALL PEOPLE */
    @Get('')
    async index(): Promise<PeopleEntity[]>{
        return await this.peopleService.index();
    }

    /* GET ONE PEOPLE */
    @Get(':id')
    async get(@Param('id') id: number): Promise<PeopleEntity>{
        return await this.peopleService.show(id);
    }
       

}
