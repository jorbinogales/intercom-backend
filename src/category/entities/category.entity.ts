
import { UserEntity } from "src/user/entities/user.entity";
import {  Entity } from "typeorm";

@Entity('category')
export class CategoryEntity{
    id: number;
    name: string;
    created_by: UserEntity;
    updated_by: UserEntity;
    deleted_by: UserEntity;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}