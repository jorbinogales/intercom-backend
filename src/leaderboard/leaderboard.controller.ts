import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  DefaultValuePipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { hasRoles } from './../auth/decorators/role.decorator';
import { GetUser } from './../auth/decorators/user.decorator';
import { Roles } from './../auth/enum/roles';
import { JwtAuthGuard } from './../auth/guards/jwtAuth.guard';
import { RolesGuard } from './../auth/guards/role.guard';
import { UserEntity } from './../user/entities/user.entity';
import { UploadFileNestjs } from './../utils/decorators/UploadFile.decorator';
import { PictureFilterFile } from './../utils/helpers/picture.filter';
import { CreateLeaderBoardDto } from './dto/createLeaderboard.dto';
import { UpdateLeaderboardDto } from './dto/updateLeaderboard.dto';
import { LeaderBoardEntity } from './entities/leaderboard.entity';
import { LeaderboardService } from './leaderboard.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderService: LeaderboardService) {}

  /* CREATE A LEADERBOARD STORE [ ONLY DEV ] */
  @Post('')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Leaderboard [ONLY DEV]' })
  @UseInterceptors(FileInterceptor('icon', { fileFilter: PictureFilterFile }))
  @UploadFileNestjs('icon')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  async store(
    @Body() createLeaderBoarDto: CreateLeaderBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.leaderService.store(createLeaderBoarDto, user);
  }

  @Post('paginate')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all leaderboards created [ONLY DEV]' })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  async indexPaginate(
    @GetUser() user: UserEntity,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Body() filtros: any,
  ): Promise<Pagination<LeaderBoardEntity[]>> {
    limit = limit > 100 ? 100 : limit;
    return await this.leaderService.indexPaginate(user, page, limit, filtros);
  }

  /* GET ALL LEADERBOARDS CREATED [ONLY DEV]*/
  @Get('')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all leaderboards created [ONLY DEV]' })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  async index(@GetUser() user: UserEntity): Promise<LeaderBoardEntity[]> {
    return await this.leaderService.index(user);
  }

  /* GET A LEADERBOARD [ ALL  ] */
  @Get(':id')
  @ApiOperation({ summary: 'Get a leaderboard with id [ALL]' })
  async get(@Param('id') id: number): Promise<LeaderBoardEntity> {
    return await this.leaderService.get(id);
  }

  /* GET ALL LEADERBOARDS FROM GAME [ ALL ]*/
  @Get('game/:id')
  @ApiOperation({ summary: 'Get all leaderboars from game [ALL]' })
  async getFromGAME(@Param('id') id: number): Promise<LeaderBoardEntity[]> {
    return await this.leaderService.getFromGames(id);
  }

  /* UPDATE A LEADERBOARD [ ONLY DEV ] */
  @Patch(':id')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upadate a Leaderboard [ONLY DEV]' })
  @UseInterceptors(FileInterceptor('icon', { fileFilter: PictureFilterFile }))
  @UploadFileNestjs('icon')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  async update(
    @Param('id') id: number,
    @Body() updateLeaderboardDto: UpdateLeaderboardDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.leaderService.update(updateLeaderboardDto, user, id);
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
    @Param('id') id: number,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.leaderService.delete(id, user);
  }
}
