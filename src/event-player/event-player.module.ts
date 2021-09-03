import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { EventModule } from 'src/event/event.module';
import { GameUserModule } from 'src/game-user/game-user.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { EventPlayerController } from './event-player.controller';
import { EventPlayerService } from './event-player.service';

@Module({
  imports: [
      AuthModule,
      GameUserModule,
      EventModule,
      ClientsModule.register(GatewayOptions),
  ],
  controllers: [EventPlayerController],
  providers: [EventPlayerService]
})
export class EventPlayerModule {}
