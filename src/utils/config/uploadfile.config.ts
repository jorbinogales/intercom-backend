import { join } from "path";
import { RenameImage } from "../helpers/renameFileName.filter";
import * as multerGoogleStorage from 'multer-google-storage';
import { MulterModuleAsyncOptions } from "@nestjs/platform-express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PictureFilterFile } from "../helpers/picture.filter";

export const UploadFileConfig: MulterModuleAsyncOptions = {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
           storage:
            multerGoogleStorage.storageEngine({
                projectId: configService.get<string>('CLOUD_PROYECT_ID'),
                bucket: configService.get<string>('CLOUD_BUCKET'),
                keyFilename: join(__dirname, '..', configService.get<string>('CLOUD_KEY_JSON')),
                fileName: RenameImage,
            }),
             limits: {
                fileSize: 2400000,
            },
            fileFilter: PictureFilterFile,
        }
      }
}
