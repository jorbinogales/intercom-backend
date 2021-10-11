import { Controller, Get, UseGuards, Body, Put, Param } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Roles } from 'src/auth/enum/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateLawyerDto } from './dto/updateLawyer.dto';
import { LawyerEntity } from './entities/lawyer.entity';
import { LawyerService } from './lawyer.service';

@Controller('lawyer')
export class LawyerController {

    constructor(private readonly _lawyerService: LawyerService){}

    /* INDEX */
    @Get('')
    async index(): Promise<LawyerEntity[]>{
        return await this._lawyerService.index();
    }

    /* INDEX */
    @Get(':id')
    async get(
        @Param() id: number,
    ): Promise<LawyerEntity>{
        return await this._lawyerService.getOne(id);
    }

    /* UPDATE */
    @Put('')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async update(
        @GetUser() user: number,
        @Body() _updateLawyerDto: UpdateLawyerDto
    ): Promise<LawyerEntity[]>{
        return await this._lawyerService.update(user, _updateLawyerDto);
    }

     /* GET LAWYER PROFILE */
    @Get('profile')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async lawyerProfile(
        @GetUser() user: number,
    ): Promise<LawyerEntity[]>{
        return await this._lawyerService.getByIdUser(user);
    }

}
