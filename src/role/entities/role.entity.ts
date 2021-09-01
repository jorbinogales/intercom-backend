import { Roles } from "src/auth/enum/roles";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity('role')
export class RoleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user_id: UserEntity;

    @Column({ type: 'enum', enum: Roles, default: 2 })
    role: Roles;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;

}