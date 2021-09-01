import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register(GatewayOptions),
    JwtModule.register({
      secret: 'yoursecret',
      signOptions: { expiresIn: '3600s'}
    })
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
