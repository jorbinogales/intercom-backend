import { AnsweringEntity } from "src/answering/entities/answering.entity";
import { PeopleEntity } from "src/people/entities/people.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('question')
export class QuestionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PeopleEntity, people => people.id)
    @JoinColumn({ name: 'people_id'})
    people_id: PeopleEntity;

    @OneToMany(() => AnsweringEntity, answering => answering.question_id, { eager: true })
    answerings: AnsweringEntity[];

    @Column({ name: 'text' , type: 'longtext', nullable: false })
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;


}