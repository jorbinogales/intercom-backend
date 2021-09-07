import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CategoryService } from './../category/category.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGame.dto';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GameService {
    constructor(@Inject('MICRO-DEV') private microDev: ClientProxy,
                private readonly categoryService: CategoryService) { }
    
    /* CREATE GAME */
    async store(
        createGameDto: CreateGameDto,
        user: UserEntity,
        icon: string,
        image: string,): Promise<any>{
        const { category_id } = createGameDto;
        await this.categoryService.get(category_id)
        return this.microDev.send(
            { cmd: 'game_store' },
            { createGameDto, user, icon, image });
    }

    /* GET  GAME */
    async get(id: string): Promise<GameEntity> {
        const game = await this.microDev.send({ cmd: 'game_get' }, { id }).toPromise();
        if (!game) {
            throw new NotFoundException(`Game with ${id} not found`)
        }
        return game;
    }

    /* GET ALL GAMES FROM USER */
    async index(user: UserEntity): Promise<GameEntity[]> {
        return await this.microDev.send({ cmd: 'game_user' }, { user }).toPromise();
    }

    /* UPDATE A GAME */
    async update(
        updateGameDto: UpdateGameDto,
        user: UserEntity,
        id: string): Promise<any> {
        const game = await this.check(id, user);
        return await this.microDev.send({ cmd: 'game_update' }, { updateGameDto, user, game }).toPromise()
    }

    /* DELETE A GAME */
    async delete(
        user: UserEntity,
        id: string): Promise<any> {
        await this.check(id, user);
        return await this.microDev.send({ cmd: 'game_delete' }, { user, id }).toPromise();
    }

    /* CHECK PROPERTY A GAME */
    async check(
        id: string,
        user: UserEntity,
    ): Promise<GameEntity>{
        const game = await this.microDev.send(
            { cmd: 'game_check_property' },
            { user, id }).toPromise();
        if (!game) {
            throw new NotFoundException(`This game is not your property`);
        }
        return game;
    }

    /* GET ALL GAMES */
    all() {
        return this.microDev.send({ cmd: 'game_all' }, { });
    }
}
