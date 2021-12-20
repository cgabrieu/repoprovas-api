/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRepository } from 'typeorm';
import ClassEntity from '../entities/ClassEntity';
import CourseEntity from '../entities/CourseEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import IClass from '../protocols/IClass';

export async function create(classBody: IClass): Promise<ClassEntity> {
  const { name, period, courseId } = classBody;

  const existsCourses = await getRepository(CourseEntity).findByIds(courseId);
  if (existsCourses.length < courseId.length) {
    throw new NotFound('Course not found.');
  }

  const existsClass = await getRepository(ClassEntity)
    .createQueryBuilder()
    .where('LOWER(name) = LOWER(:name)', { name })
    .getOne();
  if (existsClass) {
    const exitsClassCoursesIds = existsClass.courses.map(({ id }) => id);
    const newCoursesIds = courseId.filter((id) => !exitsClassCoursesIds.includes(id));
    const newCourses = await getRepository(CourseEntity).findByIds(newCoursesIds);
    if (!newCourses.length) {
      throw new Conflict('Class already exists.');
    }

    existsClass.courses.push(...newCourses);
    await getRepository(ClassEntity).save(existsClass);
    return null;
  }

  const newClass = new ClassEntity();
  newClass.name = name;
  newClass.period = period;
  newClass.courses = existsCourses;

  await getRepository(ClassEntity).save(newClass);

  return newClass;
}

export async function getByCourse(courseId: number): Promise<IClass[]> {
  const classes = await getRepository(ClassEntity).find({
    where: (qb: any) => {
      qb.where('course_id = :courseId', { courseId });
    },
  });

  if (!classes.length) {
    throw new NotFound('No registered classes found.');
  }

  return classes;
}
