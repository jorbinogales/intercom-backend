import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { AnsweringService } from './answering.service';
import { CreateAnsweringDto } from './dto/createAnswering.dto';

@Controller('answering')
export class AnsweringController {
    constructor(private readonly answeringService: AnsweringService) { }
    
    /* STORE ANSWERING */
    @Post('')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async store(
        @GetUser() user: UserEntity,
        @Body() _createAnswerginDto: CreateAnsweringDto
    ): Promise<any> {
        return this.answeringService.store(_createAnswerginDto)
    }
}
