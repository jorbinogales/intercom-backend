import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    /* GET ONE QUESTION */
    @Get(':id')
    async get(@Param('id') id: number): Promise<QuestionEntity>{
        return await this.questionService.get(id);
    }

}
