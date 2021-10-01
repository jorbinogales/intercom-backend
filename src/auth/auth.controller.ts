import { Request } from '@nestjs/common';
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { hasRoles } from './decorators/role.decorator';
import { GetUser } from './decorators/user.decorator';
import { RegisterLawyerDto } from './dto/registerLawyer.dto';
import { Roles } from './enum/roles';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { RolesGuard } from './guards/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    /* LOGIN FOR LAWYER */
    @Post('register')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Authentification Developer [ONLY LAWYER]' })
    @ApiCreatedResponse({ description: 'User Login' })
    async register(@Body() registerLawyerDto: RegisterLawyerDto): Promise<UserEntity>{
        return await this.authService.register(registerLawyerDto);
    }


    /* REFRESH TOKEN DEVELOPER */
    @Get('profile')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async profile(
        @GetUser() user: number,
    ): Promise<any>{
        return await this.authService.validateUser(user);
    }

        /* REFRESH TOKEN DEVELOPER */
    @Post('refresh')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Lawyer)
    async refresh(
        @Body() body: any,
    ): Promise<any>{
        return await this.authService.refresh(body.token);
    }

}
