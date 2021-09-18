import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './../auth/auth.module';
import { GameUserModule } from './../game-user/game-user.module';
import { GameModule } from './../game/game.module';
import { GatewayOptions } from './../utils/gateway/gateway';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    AuthModule,
    GameModule,
    GameUserModule,
    ClientsModule.registerAsync(GatewayOptions),
   ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
