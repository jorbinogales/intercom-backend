import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { join } from "path";
import { pictureFilter } from "../helpers/picture.filter";
import { RenameImage } from "../helpers/renameFileName.filter";
import * as multerGoogleStorage from 'multer-google-storage';

export const PictureFileConfig: MulterOptions = {
    storage:
        multerGoogleStorage.storageEngine({
            projectId: 'smart-road-325220',
            bucket: 'nestjs',
            keyFilename: join(__dirname, '..', 'smart-road-325220-57a91a30e9b5.json'),
            fileName: RenameImage,
        }),
        // multerGoogleStorage.storageEngine({
        //     projectId: 'dotted-guru-322720',
        //     bucket: 'hub_paneldesarrollador_bucket',
        //     keyFilename: join(__dirname, '..', 'dotted-guru-322720-a1b3b211fcdd.json'),
        //     fileName: RenameImage,
        // }),
    preservePath: true,
    // dest: './uploads',
    limits: {
        fileSize: 2400000,
    },
    fileFilter: pictureFilter,
}
