import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { createGameUserDto } from './dto/createGameUser.dto';
import { GameUserService } from './game-user.service';

@ApiTags('Game User')
@Controller('gameuser')
export class GameUserController {
    constructor(private readonly gameUserService: GameUserService) { }

    /* CREATE A GAME USER [ONLY DEV] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a game user [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() createGameUserDto: createGameUserDto,
        @GetUser() user: UserEntity,
    ): Promise<any> {
        return await this.gameUserService.store(createGameUserDto, user);
    }

    
    /* DELETE A GAME USER [ONLY DEV] */
    @Delete(':id')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a game user [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async delete(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ): Promise<any> {
        return await this.gameUserService.delete(id, user);
    }

    
}
