import { PictureFilterFile } from "../helpers/picture.filter";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
export const ValidatedFileConfig: MulterOptions = {
    limits: {
        fileSize: 2400000,
    },
    fileFilter: PictureFilterFile,
}
