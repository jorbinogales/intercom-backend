import { AnsweringEntity } from "src/answering/entities/answering.entity";
import { LawyerEntity } from "src/lawyer/entities/lawyer.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => LawyerEntity, lawyer => lawyer.user_id, { eager: true })
    lawyer_id: LawyerEntity;

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