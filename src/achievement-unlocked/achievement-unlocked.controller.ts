import { Body, Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
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
