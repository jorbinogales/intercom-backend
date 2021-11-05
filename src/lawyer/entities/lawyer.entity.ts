import { AnsweringEntity } from "src/answering/entities/answering.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('lawyer')
export class LawyerEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user_id: UserEntity;

    @OneToMany(() => AnsweringEntity, answerings => answerings.lawyer_id)
    answerings: AnsweringEntity[];

    @Column({ name: 'name' , type: 'varchar', length: '255', nullable: true, default: 'Abogado' })
    name: string;

    @Column({ name: 'birth', type: 'datetime', nullable: true})
    birth: Date;

    @Column({ name: 'authorized', type: 'boolean', nullable: false, default: 0})
    authorized: string;

    @Column({ name: 'picture', type: 'longtext', nullable: true})
    picture: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;


}