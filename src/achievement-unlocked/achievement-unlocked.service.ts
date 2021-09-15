import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AchievementService } from 'src/achievement/achievement.service';
import { AchievementEntity } from 'src/achievement/entities/achievement.entity';
import { GameUserEntity } from 'src/game-user/entities/gameUser.entity';
import { GameUserService } from 'src/game-user/game-user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UnlockedAchievementDto } from './dto/unlockedAchievement.dto';
import { AchievementUnlockedEntity } from './entities/achievement-unlocked.entity';

@Injectable()
export class AchievementUnlockedService {
    constructor(
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly achievementService: AchievementService,
        private readonly gameUser: GameUserService,
    ) { }

    /* STORE */
    async store(
        unlockedAchievementDto: UnlockedAchievementDto,
        user: UserEntity): Promise<any>{
        const { achievement_id, user_id } = unlockedAchievementDto;
        const achievement = await this.achievementService.check(achievement_id, user);
        const { game_value } = achievement;
        const gameUser = await this.gameUser.checkPlaying(game_value, user_id);
        const unlocked = await this.check(achievement, gameUser);
        if (!gameUser) {
            throw new BadRequestException(`This user is not playing this game`);
        }
        if (unlocked) {
            throw new BadRequestException(`This user already unlocked this achievement`);
        }
       return await this.microDev.send(
                { cmd: 'unlocked_store' }, { achievement, gameUser, user }
            ).toPromise();
    }

    /* Get */
    async get(id: string):Promise<AchievementUnlockedEntity>{
        const achievement =   await this.microDev.send(
            { cmd: 'unlocked_get' }, { id }
        ).toPromise();
        if (!achievement) {
            throw new NotFoundException(`Unlcoked Achievement With id ${id} not found`);
        }
        return achievement;
    }

    /* CHECK */
    async check(
        achievement: AchievementEntity,
        gameUser: GameUserEntity
    ): Promise<AchievementUnlockedEntity>{
        const unlocked = await this.microDev.send(
            { cmd: 'unlocked_check' }, { achievement, gameUser }
        ).toPromise();
        return unlocked;
    }

}
