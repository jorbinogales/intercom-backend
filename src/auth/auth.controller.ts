import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { hasRoles } from './decorators/role.decorator';
import { GetUser } from './decorators/user.decorator';
import { LoginLawyerDto } from './dto/loginLawyer.dto';
import { RegisterLawyerDto } from './dto/registerLawyer.dto';
import { Roles } from './enum/roles';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { RolesGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    /* LOGIN FOR LAWYER */
    @Post('register')
    async register(@Body() registerLawyerDto: RegisterLawyerDto): Promise<UserEntity>{
        return await this.authService.register(registerLawyerDto);
    }

    /* LOGIN */
    @Post('login')
    async login(@Body() loginLawyerDto: LoginLawyerDto): Promise<any>{
        return await this.authService.login(loginLawyerDto);
    }

    /* REFRESH TOKEN DEVELOPER */
    @Get('profile')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.USER)
    async profile(
        @GetUser() user: number,
    ): Promise<any>{
        return await this.authService.validateUser(user);
    }
    

    /* REFRESH TOKEN DEVELOPER */
    @Post('refresh')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.USER)
    async refresh(
        @Body() body: any,
    ): Promise<any>{
        return await this.authService.refresh(body.token);
    }

}
