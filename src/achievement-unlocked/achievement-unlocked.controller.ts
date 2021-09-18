import { Body, Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from './../auth/decorators/role.decorator';
import { GetUser } from './../auth/decorators/user.decorator';
import { Roles } from './../auth/enum/roles';
import { JwtAuthGuard } from './../auth/guards/jwtAuth.guard';
import { RolesGuard } from './../auth/guards/role.guard';
import { UserEntity } from './../user/entities/user.entity';
import { AchievementUnlockedService } from './achievement-unlocked.service';
import { UnlockedAchievementDto } from './dto/unlockedAchievement.dto';
import { AchievementUnlockedEntity } from './entities/achievement-unlocked.entity';

@ApiTags('Achievement Unlocked')
@Controller('unlocked')
export class AchievementUnlockedController {

    constructor(private readonly achievementUnlockedService: AchievementUnlockedService){}
     
    /* POST ACHIEVEMENT UNLCOKED [ONLY DEV] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Unlocked Achievement [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() unlockedAchievementDto: UnlockedAchievementDto,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.achievementUnlockedService.store(unlockedAchievementDto, user);
    }

    /* POST ACHIEVEMENT UNLCOKED [ ALL] */
    @Get(':id')
    @ApiOperation({ summary: 'Get unlockedd achievement [ALL]' })
    async get(
        @Param('id') id: string
    ): Promise<AchievementUnlockedEntity>{
        return await this.achievementUnlockedService.get(id);
    }

    


}
