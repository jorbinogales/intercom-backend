import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { pictureFilter } from "../helpers/picture.filter";
import { RenameImage } from "../helpers/renameFileName.filter";

export const PictureFileConfig: MulterOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: RenameImage
    }),
    preservePath: true,
    limits: {
        fileSize: 2400000,
    },
    fileFilter: pictureFilter,
}