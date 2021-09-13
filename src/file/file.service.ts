import { Injectable } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { EventService } from 'src/event/event.service';
import { GameService } from 'src/game/game.service';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UploadFileDto } from './dto/uploadFile.dto';
import { FileModelName } from './model/file.model';

@Injectable()
export class FileService {
    constructor(
        private readonly gameService: GameService,
        private readonly leaderboardService: LeaderboardService,
    ) { }
    
    /* STORE */
    async store(
        uploadFileDto: UploadFileDto,
        user: UserEntity,
        screenshots: string[],
        icon?: string,
        image?: string,
        avatar?: string): Promise<any>{
        const { entity_name } = uploadFileDto;
        if (entity_name === FileModelName.GAME) {
            return await this.gameService.addImage(uploadFileDto, user, image, icon, screenshots);
        }
        if (entity_name === FileModelName.LEADERBOARD) {
            return await this.leaderboardService.addImage(uploadFileDto, icon);
        }
        if (entity_name == FileModelName.USER) {
            return await this.userSerivce.addImage(uploadFileDto, avatar);
        }
    } 
}
