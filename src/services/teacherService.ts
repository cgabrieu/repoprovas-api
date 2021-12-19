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

  const existsTeacher = await getRepository(TeacherEntity).findOne({ name });
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

export async function getByCourse(courseId: number): Promise<IClass[]> {
  const classes = await getRepository(ClassEntity).find({
    where: (qb: any) => {
        qb.where('course_id = :courseId', {courseId})
    }
  });

  if (!classes) {
    throw new NotFound('No registered classes found.');
  }

  return classes;
}
