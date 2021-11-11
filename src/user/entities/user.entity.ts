import { DespachoEntity } from "src/despacho/entities/despacho.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email' , type: 'varchar', length: '255', nullable: false, unique: true})
    email: string;

    @Column({ name: 'email_verificado', type: 'timestamp', nullable: true })
    email_verificado: Date; 

    @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true})
    picture: string;

    @Column({ name: 'password', type: 'longtext' })
    password: string;

    @OneToMany(() => RoleEntity, role => role.user_id)
    roles: RoleEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;


}