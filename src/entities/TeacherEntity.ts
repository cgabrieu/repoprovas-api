import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import CourseEntity from './CourseEntity';

@Entity('teachers')
export default class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => CourseEntity, (course) => course.id, { eager: true })
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
    courses: CourseEntity[]
}