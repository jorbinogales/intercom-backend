import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { PictureFileConfig } from 'src/utils/config/uploadfile.config';
import { uploadFile } from 'src/utils/files/UploadFile.decorator';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/createAchievement.dto';
import { UpdateAchievementDto } from './dto/updateAchievement.dto';
import { AchievementEntity } from './entities/achievement.entity';

@ApiTags('Achievement')
@Controller('achievement')
export class AchievementController {
    constructor(private readonly achievementService: AchievementService) { }
    
    /* STORE ACHIEVEMENT [ ONLY DEV ] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a achievement [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 },
        ],
        PictureFileConfig 
    ))
    @uploadFile('icon')
    async store(
        @Body() CreateAchievementDto: CreateAchievementDto,
        @UploadedFile() file: { icon: Express.Multer.File[] },
        @GetUser() user: UserEntity,
    ): Promise<any>{
        console.log(file);
        return await this.achievementService.store(CreateAchievementDto, file, user);
    }

    /* GET ALL ACHIEVEMENT CREATED [ ONLY DEV ] */
    @Get('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all achievements created [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    @ApiOperation({ summary: 'Get all achievement created [ONLY DEV]' })
    async index(@GetUser() user: UserEntity): Promise<AchievementEntity[]>{
        return await this.achievementService.index(user);
    }

    /* GET A ACHIEVEMENT WIDTH ID [ ALL ] */
    @Get(':id')
    @ApiOperation({ summary: 'Get a achievement with id [ALL]' })
    async get(@Param('id') id:string): Promise<AchievementEntity>{
        return await this.achievementService.get(id)
    }

     /* GET ACHIEVEMET FROM GAME [ ALL ] */
    @Get('game/:id')
    @ApiOperation({ summary: 'Get all achievement from game [ALL]' })
    async getFromGame(@Param('id') id:string): Promise<AchievementEntity[]>{
        return await this.achievementService.getFromGame(id)
    }

    /* UPDATE ACHIEVEMENT [ ONLY DEV ] */
    @Patch(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a achievement [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 },
        ],
        PictureFileConfig 
    ))
    @uploadFile('icon')
    async update(
        @Param('id') id: string,
        @Body() updateAchievementDto: UpdateAchievementDto,
        @UploadedFile() file: { icon: Express.Multer.File[] },
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.achievementService.update(updateAchievementDto, user, id, file);
    }

    
    /* DELETE ACHIEVEMENT [ ONLY DEV ] */
    @Delete(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a achievement [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async delete(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.achievementService.delete(id, user);
    }
}
