import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyerController } from './lawyer.controller';
import { LawyerService } from './lawyer.service';
import { LawyerRepository } from './repository/lawyer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LawyerRepository])
  ],
  controllers: [LawyerController],
  providers: [LawyerService],
  exports: [LawyerService],
})
export class LawyerModule {}
