import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameService } from 'src/game/game.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateAchievementDto } from './dto/createAchievement.dto';
import { UpdateAchievementDto } from './dto/updateAchievement.dto';
import { AchievementEntity } from './entities/achievement.entity';

@Injectable()
export class AchievementService {
    constructor(
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly gameService: GameService,
    ) { }

    /* STORE */
    async store(
        createAchievementDto: CreateAchievementDto,
        file: any,
        user: UserEntity): Promise<any>{
        const { game_id } = createAchievementDto;
        const game = await this.gameService.check(game_id, user);
        if (game) {
            return await this.microDev.send(
                { cmd: 'achievement_store' },
                { createAchievementDto, user, game, file }
            ).toPromise();
        }
        return null;
    }

    /* GET ALL ACHIEVEMENT CREATED */
    async index(user: UserEntity): Promise<AchievementEntity[]>{
        return await this.microDev.send({ cmd: 'achievement_index' }, { user }).toPromise();
    }

    /* GET A ACHIEVEMENT WITH ID */
    async get(
        id: number
    ): Promise<AchievementEntity>{
        const achievement = await this.microDev.send(
            { cmd: 'achievement_get' }, { id }).toPromise();
        if (!achievement) {
            throw new NotFoundException(`Achievement with id ${id} not found`);
        }
        return achievement;
    }

     /* GET FROM GAME */
    async getFromGame(
        id: number
    ): Promise<AchievementEntity[]>{
        const game = await this.gameService.get(id);
        if (!game) {
            throw new NotFoundException(`Game not found ${id}`);
        }
        const achievement = await this.microDev.send(
            { cmd: 'achievement_get_from_game' }, { id }).toPromise();
        return achievement;
    }

     /* STORE */
    async update(
        updateAchievementDto: UpdateAchievementDto,
        user: UserEntity,
        id: number,
        file?: any): Promise<any>{
        const { game_id } = updateAchievementDto;
        let game = null;
        if (game_id) {
            game = await this.gameService.check(game_id, user);  
        }
        const achievement = await this.check(id, user); 
        return await this.microDev.send(
            { cmd: 'achievement_update' },
            { updateAchievementDto, user, achievement, game, file }).toPromise();
    }

    /* CHECK PROPERTY ACHIEVEMENT */
    async delete(id: number, user: UserEntity): Promise<any>{
        const achievement = await this.check(id, user);
        return await this.microDev.send({ cmd: 'achievement_delete' }, { achievement , user }).toPromise();
    }
    
    
    
    /* CHECK PROPERTY ACHIEVEMENT */
    async check(id: number, user: UserEntity): Promise<AchievementEntity>{
        const achievement = await this.microDev.send(
            { cmd: 'achievement_check' }, { id, user }
        ).toPromise();
        if (!achievement) {
            throw new UnauthorizedException(`This achievement is not your property`);
        }
        return achievement;
    }
}
