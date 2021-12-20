import { Check, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import CourseEntity from './CourseEntity';

@Entity('classes')
@Check('"period" BETWEEN 1 AND 10')
export default class ClassEntity {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('integer')
    period: number;

    @ManyToMany(() => CourseEntity, { eager: true })
    @JoinTable({
        name: 'classes_courses',
        joinColumn: {
            name: 'class_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "course_id",
            referencedColumnName: "id"
        }
    })
    courses: CourseEntity[];
}