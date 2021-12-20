import { getRepository } from 'typeorm';
import ClassEntity from '../entities/ClassEntity';
import CourseEntity from '../entities/CourseEntity';
import TeacherEntity from '../entities/TeacherEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import ITeacher from '../protocols/ITeacher';

export async function create(teacherBody: ITeacher): Promise<TeacherEntity> {
  const { name, courseId, classId } = teacherBody;

  const existsCourses = await getRepository(CourseEntity).findByIds(courseId);
  if (existsCourses.length < courseId.length) {
    throw new NotFound('Course not found.');
  }

  const existsClasses = await getRepository(ClassEntity).findByIds(classId);
  if (existsClasses.length < classId.length) {
    throw new NotFound('Class not found.');
  }

  const existsTeacher = await getRepository(TeacherEntity)
    .createQueryBuilder('teacher')
    .leftJoinAndSelect('teacher.courses', 'courses')
    .leftJoinAndSelect('teacher.classes', 'classes')
    .where('LOWER(teacher.name) = LOWER(:name)', { name })
    .getOne();

  if (existsTeacher) {
    const exitsTeacherCoursesIds = existsTeacher.courses.map(({ id }) => id);
    const newCoursesIds = courseId.filter((id) => !exitsTeacherCoursesIds.includes(id));
    const newCourses = await getRepository(CourseEntity).findByIds(newCoursesIds);

    const exitsTeacherClassIds = existsTeacher.classes.map(({ id }) => id);
    const newClassIds = classId.filter((id) => !exitsTeacherClassIds.includes(id));
    const newClass = await getRepository(ClassEntity).findByIds(newClassIds);

    if (!newCourses.length && !newClass.length) {
      throw new Conflict('Teacher already exists.');
    }

    existsTeacher.courses.push(...newCourses);
    existsTeacher.classes.push(...newClass);
    await getRepository(TeacherEntity).save(existsTeacher);
    return null;
  }

  const newTeacher = new TeacherEntity();
  newTeacher.name = name;
  newTeacher.courses = existsCourses;
  newTeacher.classes = existsClasses;

  await getRepository(TeacherEntity).save(newTeacher);

  return newTeacher;
}

export async function getByCourse(courseId: number): Promise<ITeacher[]> {
  const teachers = await getRepository(TeacherEntity)
    .createQueryBuilder('teacher')
    .leftJoin('teacher.courses', 'courses')
    .where('courses.id = :courseId', { courseId })
    .getMany();

  if (!teachers.length) {
    throw new NotFound('Teachers not found.');
  }

  return teachers;
}

export async function getByClass(classId: number): Promise<ITeacher[]> {
  const teachers = await getRepository(TeacherEntity)
    .createQueryBuilder('teacher')
    .leftJoin('teacher.classes', 'classes')
    .where('classes.id = :classId', { classId })
    .getMany();

  if (!teachers.length) {
    throw new NotFound('Teachers not found.');
  }

  return teachers;
}
