import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from './../auth/decorators/role.decorator';
import { GetUser } from './../auth/decorators/user.decorator';
import { Roles } from './../auth/enum/roles';
import { JwtAuthGuard } from './../auth/guards/jwtAuth.guard';
import { RolesGuard } from './../auth/guards/role.guard';
import { UploadFileDto } from './dto/uploadFile.dto';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    /* UPLOAD FILE CONTROLLER [ ONLY DEV AND ADMIN ] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload Images' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.USER)
    @UseInterceptors(
        FileFieldsInterceptor(
            [ { name: 'image', maxCount: 1, },{ name: 'icon', maxCount: 1, }, { name: 'screenshots', maxCount: 5 }, { name: 'avatar', maxCount: 1},],
        )
    )
    async store(
        @Body() uploadFileDto: UploadFileDto,
        @UploadedFiles() files: {
            image?: Express.Multer.File, icon?: Express.Multer.File, screenshots?: Express.Multer.File[], avatar?: Express.Multer.File,
        }
    ): Promise<any>{
        let screenshots: string[] = [];
        let icon: string, image:string, avatar: string;
        return 
    }

}
