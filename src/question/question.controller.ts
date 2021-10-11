import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }
    
    /* STORE */
    @Post('')
    async store(
        @Body() CreateQuestionDto: CreateQuestionDto,
    ): Promise<any>{
        return await this.questionService.store(CreateQuestionDto);
    }

    /* INDEX */
    @Get('')
    async index(): Promise<QuestionEntity[]>{
        return await this.questionService.index();
    }

    /* GET ALL QUESTION WITHOUT ANSWERING */
    @Get('new')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async new(@GetUser() user_id: number): Promise<QuestionEntity[]>{
        return await this.questionService.new(user_id);
    }

     /* GET ALL QUESTION WITHOUT ANSWERING */
    @Get('old')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async old(@GetUser() user_id: number): Promise<QuestionEntity[]>{
        return await this.questionService.old(user_id);
    }

    /* COUNT */
    @Get('count')
    async count(): Promise<number>{
        return await this.questionService.count();
    }
    
    /* GET ONE QUESTION */
    @Get(':id')
    async get(@Param('id') id: number): Promise<QuestionEntity>{
        return await this.questionService.get(id);
    }

}
