import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameEntity } from 'src/game/entities/game.entity';
import { GameService } from 'src/game/game.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { createGameUserDto } from './dto/createGameUser.dto';
import { GameUserEntity } from './entities/gameUser.entity';

@Injectable()
export class GameUserService {
    constructor(@Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly gameService: GameService) { }
    
    /* STORE */
    async store(createGameUserDto: createGameUserDto, user: UserEntity): Promise<any>{
        const { game_id, user_id } = createGameUserDto;
        const game = await this.gameService.check(game_id, user);
        const playing = await this.checkPlaying(game, user_id);
        if (playing) {
            throw new BadRequestException(`This player with ${user_id} already playing this game`);
        }
        return await this.microDev.send(
            { cmd: 'gameuser_store' },
            { game, createGameUserDto, user }).toPromise();
    }

    /* GET LAST PLAYERS FROM DEV */
    async index(user: UserEntity): Promise<GameUserEntity[]>{
        return await this.microDev.send({ cmd: 'gameuser_index' }, { user }).toPromise();
    }

    /* DELETE GAME USER */
    async delete(id: string, user: UserEntity): Promise<any>{
        const gameuser = await this.check(id, user);
        return await this.microDev.send({ cmd: 'gameuser_delete' }, { gameuser, user }).toPromise();
    }

    /* PLAYER IS PLAYING */
    async checkPlaying(game: GameEntity, user_id: string): Promise<GameUserEntity>{
        return await this.microDev.send({ cmd: 'gameuser_isplaying' }, {game, user_id}).toPromise();
    }

    /* DELETE GAME USER */
    async check(id: string, user: UserEntity): Promise<GameUserEntity>{
        const check = await this.microDev.send({ cmd: 'gameuser_check' }, { id, user }).toPromise();
        if (!check) {
            throw new NotFoundException(`Game user with id ${id} is not your property`);
        }
        return check;
    }
}
