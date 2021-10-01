import { QuestionEntity } from "src/question/entities/question.entity";
import { Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity, CreateDateColumn, OneToMany} from "typeorm";


@Entity('people')
export class PeopleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false})
    email: string;

    @OneToMany(() => QuestionEntity, question => question.people_id, { cascade: true })
    questions: QuestionEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date;

}