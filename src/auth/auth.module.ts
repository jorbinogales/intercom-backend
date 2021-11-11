import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/role.guard';
import { JwtOptions } from './../utils/jwt/JwtOptions';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    RoleModule,
    JwtModule.registerAsync(JwtOptions)
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
