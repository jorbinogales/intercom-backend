import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/auth/enum/roles";
import { UserEntity } from "src/user/entities/user.entity";
import { RoleRepository } from "./repository/role.repository";

export class RoleService{
    constructor(@InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository) { }
    
    /* STORE */
    async store(user: UserEntity, roles: Roles) {
        return await this.roleRepository.store(user, roles);
    }
}