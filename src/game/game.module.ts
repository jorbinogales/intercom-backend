import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { FileModule } from 'src/file/file.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { AuthModule } from './../auth/auth.module';
import { CategoryModule } from './../category/category.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    forwardRef(() => FileModule),
    ClientsModule.registerAsync(GatewayOptions)
   ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
