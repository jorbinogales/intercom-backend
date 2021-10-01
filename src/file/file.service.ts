import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from 'src/auth/auth.service';
import { UploadFileDto } from './dto/uploadFile.dto';
import { DevAddImage, FileModelName } from './model/file.model';
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    @Inject('MICRO-DEV') private microDev: ClientProxy,
    private readonly auhtService: AuthService,
  ) {}

  /* STORE */
  async store(
    uploadFileDto: UploadFileDto,
    screenshots?: string[],
    icon?: string,
    image?: string,
    avatar?: string,
  ): Promise<any> {
    const { entity_name } = uploadFileDto;
    if (entity_name === FileModelName.GAME) {
      return await this.addImage(
        uploadFileDto,
        image,
        icon,
        screenshots,
        null,
        DevAddImage.GAME,
      );
    }
    if (entity_name === FileModelName.ACHIEVEMENT) {
      return await this.addImage(
        uploadFileDto,
        null,
        icon,
        null,
        null,
        DevAddImage.ACHIEVEMENT,
      );
    }
    if (entity_name === FileModelName.LEADERBOARD) {
      return await this.addImage(
        uploadFileDto,
        null,
        icon,
        null,
        null,
        DevAddImage.LEADERBOARD,
      );
    }
    if (entity_name === FileModelName.EVENT) {
      return await this.addImage(
        uploadFileDto,
        null,
        icon,
        null,
        null,
        DevAddImage.EVENT,
      );
    }
    if (entity_name === FileModelName.USER) {
      return await this.addImage(
        uploadFileDto,
        null,
        null,
        null,
        avatar,
        DevAddImage.USER,
      );
    }
  }

  async removeFiles(files: string[]) {
    if (files) {
      const storage = new Storage({
        keyFilename: join(
          __dirname,
          '..',
          this.configService.get<string>('CLOUD_KEY_JSON'),
        ),
      });
      files.map(async (image) => {
        if (image != null) {
          await storage
            .bucket(this.configService.get<string>('CLOUD_BUCKET'))
            .file(image)
            .delete();
        }
      });
    }
  }

  async addImage(
    uploadFileDto: UploadFileDto,
    image?: any,
    icon?: any,
    screenshots?: any[],
    avatar?: any,
    dev?: DevAddImage,
  ): Promise<any> {
    const { entity_id } = uploadFileDto;
    let response: any;
    return response;
  }
}
