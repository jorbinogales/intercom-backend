import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from 'src/auth/auth.service';
import { AchievementService } from './../achievement/achievement.service';
import { EventService } from './../event/event.service';
import { GameService } from './../game/game.service';
import { LeaderboardService } from './../leaderboard/leaderboard.service';
import { UserEntity } from './../user/entities/user.entity';
import { UploadFileDto } from './dto/uploadFile.dto';
import { DevAddImage, FileModelName } from './model/file.model';
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class FileService {
    constructor(
        private configService: ConfigService,
        @Inject('MICRO-DEV') private microDev: ClientProxy,
        private readonly gameService: GameService,
        private readonly achievementService: AchievementService,
        private readonly leaderboardService: LeaderboardService,
        private readonly eventService: EventService,
        private readonly auhtService: AuthService,
    ) { }
    
    /* STORE */
    async store(
        uploadFileDto: UploadFileDto,
        user: UserEntity,
        screenshots?: string[],
        icon?: string,
        image?: string,
        avatar?: string): Promise<any>{
        const { entity_name } = uploadFileDto;
        if (entity_name === FileModelName.GAME) {
            return await this.addImage(uploadFileDto, user, image, icon, screenshots, null, DevAddImage.GAME);
        }
        if (entity_name === FileModelName.ACHIEVEMENT) {
            return await this.addImage(uploadFileDto, user, null, icon, null, null, DevAddImage.ACHIEVEMENT );
        }
        if (entity_name === FileModelName.LEADERBOARD) {
            return await this.addImage(uploadFileDto, user, null, icon, null, null, DevAddImage.LEADERBOARD );
        }
        if (entity_name === FileModelName.EVENT) {
            return await this.addImage(uploadFileDto, user, null, icon, null, null, DevAddImage.EVENT );
        }
        if(entity_name === FileModelName.USER){
            return await this.addImage(uploadFileDto, user, null, null, null, avatar, DevAddImage.USER);
        }
    }
    
    async removeFiles(files: string[]) {
        if (files) {
            const storage = new Storage({
                keyFilename: join(__dirname, '..', this.configService.get<string>('CLOUD_KEY_JSON')),
            });
            files.map(async (image) => {
                if (image != null) {
                    await storage.bucket(this.configService.get<string>('CLOUD_BUCKET')).file(image).delete();
                }
            });
        }
    }

    async addImage(
        uploadFileDto: UploadFileDto,
        user: UserEntity,
        image?: any,
        icon?: any,
        screenshots?: any[],
        avatar?: any,
        dev?: DevAddImage,
    ): Promise<any>{
        const { entity_id } = uploadFileDto;
        let response: any;
        if (dev === DevAddImage.GAME) {
            const game = await this.gameService.get(entity_id);
            response = await this.microDev.send(
                { cmd: dev },
                { uploadFileDto, game, user, image, icon, screenshots }
            ).toPromise();
            await this.removeFiles(response[0].image_before);
            await this.removeFiles(response[1].screenshots_before);
        }
        if (dev === DevAddImage.ACHIEVEMENT) {
            const achievement = await this.achievementService.get(entity_id);
            response = await this.microDev.send(
                { cmd: dev },
                { uploadFileDto, achievement, user, icon }
            ).toPromise();
            await this.removeFiles(response.icon_before);
        }
        if (dev === DevAddImage.LEADERBOARD) {
            const leaderboard = await this.leaderboardService.get(entity_id);
            response = await this.microDev.send(
                { cmd: dev },
                { uploadFileDto, leaderboard, icon }
            ).toPromise();
        }
        if (dev === DevAddImage.EVENT) {
            const event = await this.eventService.get(entity_id);
            response = await this.microDev.send(
                { cmd: dev },
                { uploadFileDto, event, icon }
            ).toPromise();
        }
        if (dev === DevAddImage.USER) {
            const idUser: any = user;
            const profile = await this.auhtService.profile(idUser, 'MICRO-DEV');
            response = await this.microDev
            .send({ cmd: dev }, { uploadFileDto, profile, avatar })
            .toPromise();
            // console.log(response);
            await this.removeFiles(response.avatar_before);
        }
        return response;
    }
}
