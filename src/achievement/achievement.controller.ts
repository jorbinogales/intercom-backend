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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { ValidatedFileConfig } from 'src/utils/config/validatedFile.config';
import { UploadFileNestjs } from 'src/utils/decorators/UploadFile.decorator';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/createAchievement.dto';
import { UpdateAchievementDto } from './dto/updateAchievement.dto';
import { AchievementEntity } from './entities/achievement.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@ApiTags('Achievement')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  /* STORE ACHIEVEMENT [ ONLY DEV ] */
  @Post('')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a achievement [ONLY DEV]' })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }], ValidatedFileConfig),
  )
  @UploadFileNestjs('icon')
  async store(
    @Body() CreateAchievementDto: CreateAchievementDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.achievementService.store(CreateAchievementDto, user);
  }

  @Post('paginate')
  @ApiOperation({ summary: 'Get a achievement with id [ALL]' })
  async getPaginate(
    @GetUser() user: UserEntity,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Body() filtros:any
  ): Promise<Pagination<AchievementEntity>> {
    limit = limit > 100 ? 100 : limit;
    return await this.achievementService.getPaginate(user,limit,page,filtros);
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
  async index(@GetUser() user: UserEntity): Promise<AchievementEntity[]> {
    return await this.achievementService.index(user);
  }
  
  /* GET A ACHIEVEMENT WIDTH ID [ ALL ] */
  @Get(':id')
  @ApiOperation({ summary: 'Get a achievement with id [ALL]' })
  async get(@Param('id') id: number): Promise<AchievementEntity> {
    return await this.achievementService.get(id);
  }


  /* GET ACHIEVEMET FROM GAME [ ALL ] */
  @Get('game/:id')
  @ApiOperation({ summary: 'Get all achievement from game [ALL]' })
  async getFromGame(@Param('id') id: number): Promise<AchievementEntity[]> {
    return await this.achievementService.getFromGame(id);
  }

  /* UPDATE ACHIEVEMENT [ ONLY DEV ] */
  @Patch(':id')
  @ApiBasicAuth('XYZ')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a achievement [ONLY DEV]' })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Roles.Developer)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }], ValidatedFileConfig),
  )
  @UploadFileNestjs('icon')
  async update(
    @Param('id') id: number,
    @Body() updateAchievementDto: UpdateAchievementDto,
    @UploadedFile() file: { icon: Express.Multer.File[] },
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.achievementService.update(
      updateAchievementDto,
      user,
      id,
      file,
    );
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
    @Param('id') id: number,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.achievementService.delete(id, user);
  }
}
