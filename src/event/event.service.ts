import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameUserService } from 'src/game-user/game-user.service';
import { GameService } from 'src/game/game.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
    constructor(
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly gameService: GameService,
        private readonly gameUserService: GameUserService,
    ) { }
    
    /* STORE */
    async store(
        createEventDto: CreateEventDto,
        user: UserEntity,
    ): Promise<any>{
        const { game_id } = createEventDto;
        const game = await this.gameService.check(game_id, user);
        return await this.microDev.send(
            { cmd: 'event_store' },
            { createEventDto, game, user }
        ).toPromise();
    }

    /* GET ALL EVENTS CREATED */
    async index(user: UserEntity): Promise<EventEntity[]>{
        return await this.microDev.send({ cmd: 'event_index' }, { user }).toPromise();
    }

    /* GET EVENT WITH ID*/
    async get(id: number): Promise<EventEntity>{
        const event = await this.microDev.send({ cmd: 'event_get' }, { id }).toPromise();
        if(!event){
            throw new NotFoundException(`The event with id ${id} not found`);
        }
        return event;
    }

    /* GET FROM GAME */
    async getFromGames(game_id: number): Promise<EventEntity[]>{
        const game = await this.gameService.get(game_id);
        return await this.microDev.send({ cmd: 'event_get_from_game' }, { game }).toPromise();
    }

    /* CHECK */
    async check(id: number, user: UserEntity): Promise<EventEntity>{
        const event = await this.microDev.send({ cmd: 'event_check' }, { id, user }).toPromise();
        if (!event) {
            throw new NotFoundException(`This event is not your property`);
        }
        return event;
    }

    /* UPDATE */
    async update(
        updateEventDto: UpdateEventDto,
        user: UserEntity,
        id: number
    ): Promise<any> {
        const event = await this.check(id, user);
        const { game_id } = updateEventDto;
        let game = null;
        if (game_id) {
            game = await this.gameService.check(game_id, user);
        }
        return await this.microDev.send(
            { cmd: 'event_update' },
            { updateEventDto, user, game, event }
        ).toPromise();
    }

    /* DELETE */
    async delete(
        user: UserEntity,
        id: number,
    ): Promise<any>{
        const event = await this.check(id, user);
        return await this.microDev.send(
            { cmd: 'event_delete'},
            { event, user }
        ).toPromise();
    }
}

