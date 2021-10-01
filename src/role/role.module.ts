import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleRepository])
    ],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
