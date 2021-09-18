import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './../auth/auth.module';
import { GameModule } from './../game/game.module';
import { GatewayOptions } from './../utils/gateway/gateway';
import { GameUserController } from './game-user.controller';
import { GameUserService } from './game-user.service';

@Module({
  imports: [
    AuthModule,
    GameModule,
    ClientsModule.registerAsync(GatewayOptions),
   ],
  controllers: [GameUserController],
  providers: [GameUserService],
  exports: [GameUserService],
})
export class GameUserModule {}
