import { RoleEntity } from "./../../role/entities/role.entity";
import { PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    id_azure: string;
    name: string;
    email: string;
    avatar: string;
    roles: RoleEntity[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

}