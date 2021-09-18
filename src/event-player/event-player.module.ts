import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './../auth/auth.module';
import { EventModule } from './../event/event.module';
import { GameUserModule } from './../game-user/game-user.module';
import { GatewayOptions } from './../utils/gateway/gateway';
import { EventPlayerController } from './event-player.controller';
import { EventPlayerService } from './event-player.service';

@Module({
  imports: [
      AuthModule,
      GameUserModule,
      EventModule,
      ClientsModule.registerAsync(GatewayOptions),
  ],
  controllers: [EventPlayerController],
  providers: [EventPlayerService]
})
export class EventPlayerModule {}
