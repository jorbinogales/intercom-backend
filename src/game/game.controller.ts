import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/createGame.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Roles } from 'src/auth/enum/roles';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PictureFileConfig } from 'src/utils/config/uploadfile.config';
import { GameService } from './game.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { GameEntity } from './entities/game.entity';
import { UpdateGameDto } from './dto/updateGame.dto';
import { uploadFile } from 'src/utils/files/UploadFile.decorator';

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
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
    ],
        PictureFileConfig
    ))
    @uploadFile('picture', 'icon')
    async store(
        @Body() CreateGameDto: CreateGameDto,
        @UploadedFiles() files: { picture: Express.Multer.File[], icon: Express.Multer.File[] },
        @GetUser() user: UserEntity
    ): Promise<any>{
        console.log(files);
        return await this.gameService.store(CreateGameDto, user);
    }

    /* GET [ ALL ]*/
    @Get(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a game [ALL]' })
    async get(@Param('id') id: string): Promise<GameEntity>{
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
        @Param('id') id: string,
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
        @Param('id') id: string,
        @GetUser() user: UserEntity): Promise<GameEntity>{
        return await this.gameService.check(id, user);
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
        { name: 'picture', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
        ],
        PictureFileConfig 
    ))
    @uploadFile('picture', 'icon')
    async update(
        @Param('id') id: string,
        @Body() UpdateGameDto: UpdateGameDto,
        @UploadedFiles() files: { picture?: Express.Multer.File[], icon?: Express.Multer.File[] },
        @GetUser() user: UserEntity
    ): Promise<any>{
        console.log(files);
        return await this.gameService.update(UpdateGameDto, user, id);
    }


}
