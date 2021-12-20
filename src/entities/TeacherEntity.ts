import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import ClassEntity from './ClassEntity';
import CourseEntity from './CourseEntity';

@Entity('teachers')
export default class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => CourseEntity, { eager: true })
    @JoinTable({
        name: 'teachers_courses',
        joinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "course_id",
            referencedColumnName: "id"
        }
    })
    courses: CourseEntity[];

    @ManyToMany(() => ClassEntity, { eager: true })
    @JoinTable({
        name: 'teachers_classes',
        joinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "class_id",
            referencedColumnName: "id"
        }
    })
    classes: ClassEntity[];
}