import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { GameUserModule } from 'src/game-user/game-user.module';
import { GameModule } from 'src/game/game.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    AuthModule,
    GameModule,
    GameUserModule,
    ClientsModule.register(GatewayOptions),
   ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
