import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from '../utils/gateway/gateway';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/role.guard';
import { JwtOptions } from 'src/utils/jwt/JwtOptions';

@Module({
  imports: [
    PassportModule,
    ClientsModule.registerAsync(GatewayOptions),
    JwtModule.registerAsync(JwtOptions)
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
