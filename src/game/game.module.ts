import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GatewayOptions } from './../utils/gateway/gateway';
import { AuthModule } from './../auth/auth.module';
import { CategoryModule } from './../category/category.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigurationModule } from 'src/configuration/config.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    CategoryModule,
    ClientsModule.registerAsync(GatewayOptions)
   ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
