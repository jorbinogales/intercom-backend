import { Request } from '@nestjs/common';
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { hasRoles } from './decorators/role.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from './enum/roles';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { RolesGuard } from './guards/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    /* LOGIN FOR DEV */
    @Post('login')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Authentification Developer [ONLY DEV]' })
    @ApiBadGatewayResponse({ description: 'User deleted' })
    @ApiCreatedResponse({ description: 'User Login' })
    async login(@Body() CreateUserDto: CreateUserDto): Promise<UserEntity>{
        return await this.authService.login(CreateUserDto);
    }

    /* CHECK PROFILE */
    @Get('profile')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Profile Data [ONLY DEV]' })
    @ApiBadGatewayResponse({ description: 'Unathorized' })
    @ApiCreatedResponse({ description: 'User profile Data' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async profile(@Request() req: any): Promise<UserEntity>{
        const id = req.user.id;
        return await this.authService.profile(id, 'MICRO-DEV');
    }

    
    /* REFRESH TOKEN DEVELOPER */
    @Post('refresh')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh token developer [ONLY DEV]' })
    @ApiBadGatewayResponse({ description: 'Unathorized' })
    @ApiCreatedResponse({ description: 'Refresh token developer' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Developer)
    async refresh(
        @Body() body: any,
    ): Promise<any>{
        return await this.authService.refresh(body.token);
    }

       /* LOGIN FOR ADMIN */
    @Post('admin/login')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Authentification Admin [ONLY ADMIN]' })
    @ApiBadGatewayResponse({ description: 'User deleted' })
    @ApiCreatedResponse({ description: 'User Login' })
    async adminLogin(@Body() CreateUserDto: CreateUserDto): Promise<any>{
        return await this.authService.AdminLogin(CreateUserDto);
    }

    /* CHECK PROFILE */
    @Get('admin/profile')
    @ApiBasicAuth('XYZ')
    @ApiBearerAuth()
    @ApiBadGatewayResponse({ description: 'Unathorized' })
    @ApiCreatedResponse({ description: 'User profile Data' })
    @ApiOperation({ summary: 'Get Profile data Admin [ONLY ADMIN]' })
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.Admin)
    async AdminProfile(@Request() req: any): Promise<UserEntity>{
        const id = req.user.id;
        return await this.authService.profile(id, 'MICRO-ADMIN');
    }
}
