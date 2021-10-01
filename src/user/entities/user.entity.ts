import { RoleEntity } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email' , type: 'varchar', length: '255', nullable: false, unique: true})
    email: string;

    @Column({ name: 'email_verefied_at', nullable: true })
    email_verefied_at: string;

    @Column({ name: 'password', type: 'longtext' })
    password: string;

    @OneToMany(() => RoleEntity, role => role.user_id)
    roles: RoleEntity[];

    @Column({ name: 'social_provider', nullable: true})
    social_provider: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;


}