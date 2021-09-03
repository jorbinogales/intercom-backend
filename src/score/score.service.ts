import { BadRequestException, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameUserService } from 'src/game-user/game-user.service';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateScoreDto } from './dto/createScore.dto';

@Injectable()
export class ScoreService {
    constructor(
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly leadaerService: LeaderboardService,
        private readonly gameUserService: GameUserService,
    ) { }
    
    /* CREATE A SCORE STORE */
    async store(createScoreDto: CreateScoreDto, user: UserEntity): Promise<any>{
        const { leaderboard_id, user_id } = createScoreDto;
        const leaderboard = await this.leadaerService.check(leaderboard_id, user);
        const { game } = leaderboard;
        const gameUser = await this.gameUserService.checkPlaying(game, user_id);
        if (!gameUser) {
            throw new BadRequestException(`This user is not playing this game`);
        }
        return await this.microDev.send(
            { cmd: 'score_store' },
            { createScoreDto, leaderboard, gameUser, user }
        ).toPromise();
    }
    
    
}
