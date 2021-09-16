import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UploadFileDto } from 'src/file/dto/uploadFile.dto';
import { FileService } from 'src/file/file.service';
import { CategoryService } from './../category/category.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGame.dto';
import { GameEntity } from './entities/game.entity';
import {
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class GameService {
  constructor(
    @Inject('MICRO-DEV') private microDev: ClientProxy,
    private readonly categoryService: CategoryService,
  ) {}

  /* CREATE GAME */
  async store(
    createGameDto: CreateGameDto,
    user: UserEntity,
    req: any,
  ): Promise<any> {
    if (req.fileValidationError) {
      throw new BadRequestException('El formato del archivo no es aceptable');
    }
    const { category_id } = createGameDto;
    await this.categoryService.get(category_id);

    return this.microDev.send({ cmd: 'game_store' }, { createGameDto, user });
  }

  async indexPaginate(
    user: UserEntity,
    page,
    limit,
    filtros,
  ): Promise<Pagination<GameEntity>> {
    return  await this.microDev
      .send({ cmd: 'game_user_paginate' }, { user, page, limit, filtros })
      .toPromise();
  }

  /* GET  GAME */
  async get(id: number): Promise<GameEntity> {
    const game = await this.microDev
      .send({ cmd: 'game_get' }, { id })
      .toPromise();
    if (!game) {
      throw new NotFoundException(`Game with ${id} not found`);
    }
    return await this.gameCategory(game);
  }

  /* GET ALL GAMES FROM USER */
  async index(user: UserEntity): Promise<GameEntity[]> {
    const games: GameEntity[] = await this.microDev
      .send({ cmd: 'game_user' }, { user })
      .toPromise();
    return await this.gameCategory(games);
  }

  /* UPDATE A GAME */
  async update(
    updateGameDto: UpdateGameDto,
    user: UserEntity,
    id: number,
  ): Promise<any> {
    const game = await this.check(id, user);
    return await this.microDev
      .send({ cmd: 'game_update' }, { updateGameDto, user, game })
      .toPromise();
  }

  /* DELETE A GAME */
  async delete(user: UserEntity, id: number): Promise<any> {
    const game = await this.check(id, user);
    return await this.microDev
      .send({ cmd: 'game_delete' }, { user, game })
      .toPromise();
  }

  /* CHANGE STATUS */
  async changeSatus(user: UserEntity, id: number): Promise<any> {
    const game = await this.get(id);
    return await this.microDev
      .send({ cmd: 'game_change_status' }, { user, game })
      .toPromise();
  }

  /* CHECK PROPERTY A GAME */
  async check(id: number, user: UserEntity): Promise<GameEntity> {
    const game = await this.microDev
      .send({ cmd: 'game_check_property' }, { user, id })
      .toPromise();
    if (!game) {
      throw new NotFoundException(`This game is not your property`);
    }
    return game;
  }

  /* GET ALL GAMES */
  async all() {
    return this.microDev.send({ cmd: 'game_all' }, {});
  }

  /* GET CAME WITH CATEGORY DATA */
  async gameCategory(games: any): Promise<any> {
    const games_array: GameEntity[] = [];
    for (let game of games) {
      const category_value = game.category_value;
      const category = await this.categoryService.get(category_value);
      game.category_value = category;
      games_array.push(game);
    }
    return games_array;
  }
}
