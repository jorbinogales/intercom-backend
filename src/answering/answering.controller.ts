import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { AnsweringService } from './answering.service';
import { CreateAnsweringDto } from './dto/createAnswering.dto';
import { AnsweringEntity } from './entities/answering.entity';

@Controller('answering')
export class AnsweringController {
    constructor(private readonly _answeringService: AnsweringService) { }
    
    /* STORE ANSWERING */
    @Post('')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async store(
        @GetUser() user: number,
        @Body() _createAnswerginDto: CreateAnsweringDto
    ): Promise<any> {
        return this._answeringService.store(user, _createAnswerginDto)
    }

    /* LAST ANSWERING */
    @Get('')
    async lastAnswering(): Promise<AnsweringEntity[]>{
        return await this._answeringService.lastAnswering();
    }

    @Get('count')
    async count(): Promise<number>{
        return this._answeringService.count();
    }
}
