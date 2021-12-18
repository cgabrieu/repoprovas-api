import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ClassEntity from './ClassEntity';
import TeacherEntity from './TeacherEntity';

@Entity('tests')
export default class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  semester: number;

  @Column()
  type: string;

  @Column({ length: 510 })
  link: string;

  @OneToOne(() => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity; 

  @OneToOne(() => ClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;
}
