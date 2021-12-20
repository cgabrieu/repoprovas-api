import { getRepository } from 'typeorm';
import ClassEntity from '../entities/ClassEntity';
import CourseEntity from '../entities/CourseEntity';
import TeacherEntity from '../entities/TeacherEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import IClass from '../protocols/IClass';
import ITeacher from '../protocols/ITeacher';

export async function create(teacherBody: ITeacher): Promise<TeacherEntity> {
  const { name, courseId } = teacherBody;

  const existsCourses = await getRepository(CourseEntity).findByIds(courseId);
  if (existsCourses.length < courseId.length) {
    throw new NotFound('Course not found.');
  }

  const existsTeacher = await getRepository(TeacherEntity)
    .createQueryBuilder()
    .leftJoinAndSelect('class.courses', 'courses')
    .where('LOWER(name) = LOWER(:name)', { name })
    .getOne();
  if (existsTeacher) {
    const exitsTeacherCoursesIds = existsTeacher.courses.map(({ id }) => id);
    const newCoursesIds = courseId.filter((id) => !exitsTeacherCoursesIds.includes(id));
    const newCourses = await getRepository(CourseEntity).findByIds(newCoursesIds);
    if (!newCourses.length) {
      throw new Conflict('Teacher already exists.')
    }

    existsTeacher.courses.push(...newCourses);
    await getRepository(TeacherEntity).save(existsTeacher);
    return null;
  }

  const newTeacher = new TeacherEntity();
  newTeacher.name = name;
  newTeacher.courses = existsCourses;

  await getRepository(TeacherEntity).save(newTeacher);

  return newTeacher;
}

export async function getByCourse(courseId: number): Promise<ITeacher[]> {
  const teachers = await getRepository(TeacherEntity).find({
    where: (qb: any) => {
        qb.where('course_id = :courseId', { courseId })
    },
    relations: ['courses']
  });

  if (!teachers.length) {
    throw new NotFound('Teachers not found.');
  }

  return teachers;
}

export async function getByClass(classId: number): Promise<ITeacher[]> {
  const teachers = await getRepository(TeacherEntity).find({
    where: (qb: any) => {
        qb.where('class_id = :classId', { classId })
    },
    relations: ['classes']
  });

  if (!teachers.length) {
    throw new NotFound('Teachers not found.');
  }

  return teachers;
}