import { RegisterLawyerDto } from "src/auth/dto/registerLawyer.dto";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    /* STORE */
    async store(registerLawyerDto: RegisterLawyerDto): Promise<any>{
        const { email, password } = registerLawyerDto;
        const user = this.create({
            email: email,
            password: password,
        })
        const resp = await this.save(user);
        return resp;
    }
}