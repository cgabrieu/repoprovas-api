import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export default class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}