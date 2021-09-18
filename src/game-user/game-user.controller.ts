import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from './../auth/decorators/role.decorator';
import { GetUser } from './../auth/decorators/user.decorator';
import { Roles } from './../auth/enum/roles';
import { JwtAuthGuard } from './../auth/guards/jwtAuth.guard';
import { RolesGuard } from './../auth/guards/role.guard';
import { UserEntity } from './../user/entities/user.entity';
import { createGameUserDto } from './dto/createGameUser.dto';
import { GameUserEntity } from './entities/gameUser.entity';
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

    /* GET LAST PLAYERS FROM DEV [ONLY DEV] */
    @Get('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'GET LAST PLAYERS FROM DEV [ONLY DEV]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async index(@GetUser() user: UserEntity): Promise<GameUserEntity[]>{
        return await this.gameUserService.index(user);
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
        @Param('id') id: number,
        @GetUser() user: UserEntity,
    ): Promise<any> {
        return await this.gameUserService.delete(id, user);
    }

    
}
