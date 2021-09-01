import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { PictureFileConfig } from 'src/utils/config/uploadfile.config';
import { uploadFile } from 'src/utils/files/UploadFile.decorator';
import { CreateLeaderBoardDto } from './dto/createLeaderboard.dto';
import { UpdateLeaderboardDto } from './dto/updateLeaderboard.dto';
import { LeaderBoardEntity } from './entities/leaderboard.entity';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderService: LeaderboardService) { }
    
    /* CREATE A LEADERBOARD STORE [ ONLY DEV ] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a Leaderboard [ONLY DEV]' })
    @UseInterceptors(
        FileInterceptor('icon', PictureFileConfig)
    )
    @uploadFile('icon')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() createLeaderBoarDto: CreateLeaderBoardDto,
        @GetUser() user: UserEntity,
        @UploadedFile() file: any
    ): Promise<any> {
        return await this.leaderService.store(createLeaderBoarDto, user, file);
    }

    /* GET A LEADERBOARD [ ALL  ] */
    @Get(':id')
    @ApiOperation({ summary: 'Get a leaderboard with id [ALL]' })
    async get(@Param('id') id:string): Promise<LeaderBoardEntity> {
        return await this.leaderService.get(id);
    }

    /* GET ALL LEADERBOARDS FROM GAME [ ALL ]*/
    @Get('game/:id')
    @ApiOperation({ summary: 'Get all leaderboars from game [ALL]' })
    async getFromGAME(@Param('id') id: string): Promise<LeaderBoardEntity[]>{
        return await this.leaderService.getFromGames(id);
    }

     /* UPDATE A LEADERBOARD [ ONLY DEV ] */
    @Patch(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upadate a Leaderboard [ONLY DEV]' })
    @UseInterceptors(
        FileInterceptor('icon', PictureFileConfig)
    )
    @uploadFile('icon')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async update(
        @Param('id') id:string,
        @Body() updateLeaderboardDto: UpdateLeaderboardDto,
        @GetUser() user: UserEntity,
        @UploadedFile() file: any
    ): Promise<any> {
        return await this.leaderService.update(updateLeaderboardDto, user, id, file);
    }

     /* DELETE A LEADERBOARD [ ONLY DEV ] */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a leaderboard [ONLY DEV]' })
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async delete(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.leaderService.delete(id, user);
    }

    
}
