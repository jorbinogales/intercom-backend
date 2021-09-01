import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateScoreDto } from './dto/createScore.dto';
import { ScoreService } from './score.service';

@ApiTags('Score')
@Controller('score')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) { }
    
    /* POST A SCORE OF GAME USER [ONLY DEV] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Post a score of game user [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() createScoreDto: CreateScoreDto,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.scoreService.store(createScoreDto, user);
    }
}
