import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UploadFileDto } from './../file/dto/uploadFile.dto';
import { GameService } from './../game/game.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateLeaderBoardDto } from './dto/createLeaderboard.dto';
import { UpdateLeaderboardDto } from './dto/updateLeaderboard.dto';
import { LeaderBoardEntity } from './entities/leaderboard.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject('MICRO-DEV') private microDev: ClientProxy,
    private readonly gameService: GameService,
  ) {}

  /* STORE */
  async store(
    createLeaderBoarDto: CreateLeaderBoardDto,
    user: UserEntity,
  ): Promise<any> {
    const { game_id } = createLeaderBoarDto;
    const game = await this.gameService.check(game_id, user);
    return await this.microDev
      .send({ cmd: 'leaderboard_store' }, { createLeaderBoarDto, game, user })
      .toPromise();
  }

  async indexPaginate(
    user: UserEntity,
    page,
    limit,
    filtros,
  ): Promise<Pagination<LeaderBoardEntity[]>> {
    return await this.microDev
      .send({ cmd: 'leaderboard_index_paginate' }, { user, page, limit, filtros })
      .toPromise();
  }

  /* GET ALL LEADERBOARDS CREATED */
  async index(user: UserEntity): Promise<LeaderBoardEntity[]> {
    return await this.microDev
      .send({ cmd: 'leaderboard_index' }, { user })
      .toPromise();
  }

  /* GET A LEADERBOARD WITH ID */
  async get(id: number): Promise<LeaderBoardEntity> {
    const leaderboard = await this.microDev
      .send({ cmd: 'leaderboard_get' }, { id })
      .toPromise();
    if (!leaderboard) {
      throw new NotFoundException(`Leaderboard with ${id} not found`);
    }
    return leaderboard;
  }

  /* GET LEADERBOARD FROM GAMES */
  async getFromGames(id: number): Promise<LeaderBoardEntity[]> {
    const game = await this.gameService.get(id);
    return await this.microDev
      .send({ cmd: 'leaderboard_get_from_game' }, { game })
      .toPromise();
  }

  /* UPDATE A LEADERBOARD */
  async update(
    updateLeaderboardDto: UpdateLeaderboardDto,
    user: UserEntity,
    id: number,
  ): Promise<any> {
    const { game_id } = updateLeaderboardDto;
    const leaderboard = await this.check(id, user);
    let game = null;
    if (game_id) {
      game = await this.gameService.check(game_id, user);
    }
    return await this.microDev
      .send(
        { cmd: 'leaderboard_update' },
        { updateLeaderboardDto, leaderboard, game, user },
      )
      .toPromise();
  }

  /* DELETE A LEADERBOARD */
  async delete(id: number, user: UserEntity): Promise<any> {
    const leaderboard = await this.check(id, user);
    return await this.microDev
      .send({ cmd: 'leaderboard_delete' }, { leaderboard, user })
      .toPromise();
  }

  /* CHECK PROPERTY LEADERBOARD */
  async check(id: number, user: UserEntity): Promise<LeaderBoardEntity> {
    const leaderboard = await this.microDev
      .send({ cmd: 'leaderboard_check' }, { id, user })
      .toPromise();
    if (!leaderboard) {
      throw new NotFoundException(`This leaderboard is not your property`);
    }
    return leaderboard;
  }

  /* ADD IMAGE */
  async addImage(uploadFileDto: UploadFileDto, icon: any) {}
}
