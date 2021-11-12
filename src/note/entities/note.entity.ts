import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: false })
  nombre: string;

  @Column({ type: 'integer', nullable: false })
  note1: number;

  @Column({ type: 'integer',  nullable: false })
  note2: number;

  @Column({ type: 'integer',  nullable: false })
  note3: number;

  @Column({ type: 'integer',  nullable: false })
  note4: number;

  @Column({ type: 'integer',  nullable: false })
  promedio: number;

  @CreateDateColumn()
  created_at?: Date;

}
