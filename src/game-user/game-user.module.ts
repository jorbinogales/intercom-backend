import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { GameModule } from 'src/game/game.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
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
