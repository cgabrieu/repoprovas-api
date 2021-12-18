import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import CourseEntity from './CourseEntity';

@Entity('classes')
export default class ClassEntity {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    period: number;

    @ManyToMany(() => CourseEntity, (course) => course.id, { eager: true })
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
    users: CourseEntity[]
}