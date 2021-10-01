import { LawyerEntity } from "src/lawyer/entities/lawyer.entity";
import { QuestionEntity } from "src/question/entities/question.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('answering')
export class AnsweringEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LawyerEntity, lawyer => lawyer.id)
    @JoinColumn({ name: 'lawyer_id'})
    lawyer_id: UserEntity;

    @ManyToOne(() => QuestionEntity, question => question.id)
    @JoinColumn({ name: 'question_id'})
    question_id: UserEntity;

    @Column({ name: 'text' , type: 'longtext',  nullable: false })
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;


}