import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventService } from 'src/event/event.service';
import { GameUserService } from 'src/game-user/game-user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateEventPlayerDto } from './dto/createEventPlayer.dto';

@Injectable()
export class EventPlayerService {
    constructor(
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly eventService: EventService,
        private readonly gameUserService: GameUserService,
    ) { }
    
    /* POST CREATED A EVENT PLAYER */
    async store(
        createEventPlayerDto: CreateEventPlayerDto,
        user: UserEntity
    ): Promise<any>{
        const { event_id,  user_id } = createEventPlayerDto;
        const event = await this.eventService.check(event_id, user);
        const { game } = event;
        const gameUser = await this.gameUserService.checkPlaying(game, user_id);
        console.log(gameUser);
        if (!gameUser) {
            throw new BadRequestException(`This user is not playing this game`);
        }
        return await this.microDev.send(
            { cmd: 'event_player_store' },
            { createEventPlayerDto, event, gameUser, user }
        ).toPromise();
    }
}
