import { ConsoleLogger, forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GameService } from 'src/game/game.service';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UploadFileDto } from './dto/uploadFile.dto';
import { FileModelName } from './model/file.model';
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class FileService {
    constructor(
        private readonly configService: ConfigService,
         @Inject(forwardRef(() => GameService)) private readonly gameService: GameService,
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
            return await this.gameService.addImage(uploadFileDto, user, image, icon, screenshots);
        }
    }
    
    async removeFiles(files: string[]) {
        if (files) {
            const storage = new Storage({
                keyFilename: join(__dirname, '..', this.configService.get<string>('CLOUD_KEY_JSON')),
            });
            files.map(async (image) => {
                await storage.bucket(this.configService.get<string>('CLOUD_BUCKET')).file(image).delete();
            });
        }
    }
}
