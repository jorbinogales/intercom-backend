import { Module } from '@nestjs/common';
import { EventPlayerController } from './event-player.controller';
import { EventPlayerService } from './event-player.service';

@Module({
  controllers: [EventPlayerController],
  providers: [EventPlayerService]
})
export class EventPlayerModule {}
