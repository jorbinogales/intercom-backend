import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }
    
    /* CREATE A EVENT FOR GAME [ONLY DEV] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a event for game [ ONLY DEV ]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() createEventDto: CreateEventDto,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.eventService.store(createEventDto, user);
    }

    /* GET ALL EVENTS CREATED [ ONLY DEV ] */
    @Get('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all events created  [ ONLY DEV ]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async index(@GetUser() user: UserEntity): Promise<EventEntity[]>{
        return await this.eventService.index(user);
    }

    /* GET A EVENT WITH ID [ALL] */
    @Get(':id')
    @ApiOperation({ summary: 'Get a event with id [ ALL ]' })
    async get(
        @Param('id') id: string
    ): Promise<EventEntity>{
        return await this.eventService.get(id);
    }

    /* GET ALL EVENT FROM ONE GAME [ALL]*/
    @Get('game/:id')
    async getFromGame(
        @Param('id') id: number,
    ): Promise<EventEntity[]>{
        return await this.eventService.getFromGames(id);
    }

    /* UPDATE EVENT [ONLY DEV] */
    @Patch(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a event  [ ONLY DEV ]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async update(
        @Param('id') id: number,
        @Body() updateEventDto: UpdateEventDto,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.eventService.update(updateEventDto, user, id);
    }

    /* DELETE EVENT [ONLY DEV ] */
    @Delete(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a event  [ ONLY DEV ]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async delete(
        @Param('id') id: number,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.eventService.delete(user, id);
    }
}

