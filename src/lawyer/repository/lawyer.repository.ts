import { RegisterLawyerDto } from "src/auth/dto/registerLawyer.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { LawyerEntity } from "../entities/lawyer.entity";

@EntityRepository(LawyerEntity)
export class LawyerRepository extends Repository<LawyerEntity>{

    /* STORE */
    async store(
        user: UserEntity,
        _registerLawyerDto: RegisterLawyerDto
    ): Promise<any>{
        const { name, photoUrl } = _registerLawyerDto;
        const lawyer = this.create({
            user_id: user,
            name: name,
            picture: photoUrl,
        })
        
        await this.save(lawyer);
        return {
            statusCode: 200,
        }
    }
}