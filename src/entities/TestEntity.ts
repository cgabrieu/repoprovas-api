import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ClassEntity from './ClassEntity';
import TeacherEntity from './TeacherEntity';

export type TypeRole = 'P1' | 'P2' | 'P3' | 'F' | '2ch' | 'F' | 'Outras';

export enum UserRole {
  PROVA_1 = 'P1',
  PROVA_2 = 'P2',
  PROVA_3 = 'P3',
  PROVA_FINAL = 'PF',
  SEGUNDA_CHAMADA = '2ch',
  OUTRA = 'Outra'
}

@Entity('tests')
export default class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  semester: number;

  @Column({
    type: 'enum',
    enum
  })
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
