import { UserEntity } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('Despacho')
export class DespachoEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false})
    name: string

    @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true})
    picture: string;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'owner_id'})
    owner_id: UserEntity;

}