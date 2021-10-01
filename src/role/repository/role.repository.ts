import { Roles } from "src/auth/enum/roles";
import { UserEntity } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoleEntity } from "./../entities/role.entity";

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity>{
    /* STORE */
    async store(user: UserEntity, role: Roles): Promise<any>{
        const roles = this.create({
            user_id: user,
            role: role
        })
        const resp = await this.save(roles);
        return resp;
    }
}