import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { GatewayOptions } from 'src/utils/gateway/gateway';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register(GatewayOptions),
   ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
