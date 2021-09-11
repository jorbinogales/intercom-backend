import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/createGame.dto';
import { RolesGuard } from './../auth/guards/role.guard';
import { JwtAuthGuard } from './../auth/guards/jwtAuth.guard';
import { Roles } from './../auth/enum/roles';
import { hasRoles } from './../auth/decorators/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PictureFileConfig } from './../utils/config/uploadfile.config';
import { GameService } from './game.service';
import { GetUser } from './../auth/decorators/user.decorator';
import { UserEntity } from './../user/entities/user.entity';
import { GameEntity } from './entities/game.entity';
import { UpdateGameDto } from './dto/updateGame.dto';
import { UploadFileNestjs } from '../utils/decorators/UploadFile.decorator';


@ApiTags('Game')
@Controller('game')
export class GameController {

    constructor(private readonly gameService: GameService) { }

    /* STORE  [ ONLY DEV ]*/
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a game [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    @UseInterceptors(FileFieldsInterceptor(
        [ { name: 'image' }, { name: 'icon' }, { name: 'screenshots'}],
        PictureFileConfig,
    ))
    @UploadFileNestjs('image', 'icon', 'screenshots')
    async store(
        @Body() CreateGameDto: CreateGameDto,
        @UploadedFiles() files: { image: Express.Multer.File, icon : Express.Multer.File, screenshots : Express.Multer.File  },
        @GetUser() user: UserEntity,
    ): Promise<any>{
        const screenshots = files.screenshots;
        const icon = files.icon[0].path;
        const image = files.image[0].path;
        return await this.gameService.store(CreateGameDto, user, icon, image, screenshots);
    }

    /* GET [ ALL ]*/
    @Get(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a game [ALL]' })
    async get(@Param('id') id: number): Promise<GameEntity>{
        return await this.gameService.get(id);
    }

    
    /* GET GAME USERS [ ALL ]*/
    @Get('user/:id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all games from user [ALL]' })
    async getGamesFromDev(@Param('id') id: UserEntity): Promise<GameEntity[]>{
        return await this.gameService.index(id);
    }

    /* GET ALL MY GAMES [ ALL ]*/
    @Get('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all my games  [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async getMyGames(@GetUser() user: UserEntity): Promise<GameEntity[]>{
        return await this.gameService.index(user);
    }

     /* DELETE A GAME [ONLY DEV]*/
    @Delete(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a game [ONLY DEV] ' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer, Roles.Admin)
    async delete(
        @Param('id') id: number,
        @GetUser() user: UserEntity): Promise<GameEntity[]>{
        return await this.gameService.delete(user, id);
    }

    
     /* CHECK GAME PROPERTY */
    @Get('my/:id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Check Game property [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async check(
        @Param('id') id: number,
        @GetUser() user: UserEntity): Promise<GameEntity>{
        return await this.gameService.check(id, user);
    }

    /* CHANGE STATUS [ONLY ADMIN] */
    @Put('status/:id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change Status [ONLY ADMIN]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Admin)
    async changeStatus(
        @Param('id') id: number,
        @GetUser() user: UserEntity): Promise<GameEntity>{
        return await this.gameService.changeSatus(user, id);
    }


    /* UPDATE GAME  [ ONLY DEV ]*/
    @Patch(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a game [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    @UseInterceptors(FileFieldsInterceptor([
            { name: 'image', maxCount: 1, },
            { name: 'icon', maxCount: 1, },
            { name: 'screenshots', maxCount: 5 }
        ],
        PictureFileConfig,
    ))
    @UploadFileNestjs('image')
    async update(
        @Param('id') id: number,
        @Body() UpdateGameDto: UpdateGameDto,
        @UploadedFiles() files: { picture?: Express.Multer.File[], icon?: Express.Multer.File[] },
        @GetUser() user: UserEntity
    ): Promise<any>{
        console.log(files);
        return await this.gameService.update(UpdateGameDto, user, id);
    }
    
}
