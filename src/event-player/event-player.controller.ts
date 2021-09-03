import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateEventPlayerDto } from './dto/createEventPlayer.dto';
import { EventPlayerService } from './event-player.service';

@ApiTags('Event Player')
@Controller('event_player')
export class EventPlayerController {
    constructor(private readonly eventplayerService: EventPlayerService) { }
    
    /* CREATE A EVENT PLAYER [ ONLY DEV ] */
    @Post('')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a event for game [ ONLY DEV ]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async store(
        @Body() createEventPlayerDto: CreateEventPlayerDto,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        return await this.eventplayerService.store(createEventPlayerDto, user);
    }

    /* GET A EVENT PLAYER [ ALL ]*/

    /* GET FROM GAMES [ ALL ]*/

    /* GET FROM DEVELOPERS */

}
