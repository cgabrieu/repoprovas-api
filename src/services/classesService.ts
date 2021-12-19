import { getRepository, UpdateEvent, UpdateResult } from 'typeorm';
import ClassEntity from '../entities/ClassEntity';
import CourseEntity from '../entities/CourseEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import IClass from '../protocols/IClass';
import ICourse from '../protocols/ICourse';

export async function create(classBody: IClass): Promise<ClassEntity | UpdateResult> {
  const { name, period, courseId } = classBody;

  const existsCourses = await getRepository(CourseEntity).findByIds(courseId);
  if (existsCourses.length < courseId.length) {
    throw new NotFound('Course not found.');
  }
  console.log(existsCourses);

  const existsClass = await getRepository(ClassEntity).findOne({ name });
  console.log(existsClass);
  if (existsClass) {
    Object.assign(existsClass, { courses: [this.courses, existsCourses ] })
    existsClass.save(existsClass);
    // return result;
  }

  const newClass = new ClassEntity();
  newClass.name = name;
  newClass.period = period;
  newClass.courses = existsCourses;
  
  await getRepository(ClassEntity).save(newClass);

  return newClass;
}

export async function getList(): Promise<ICourse[]> {
  const courses: ICourse[] = await getRepository(ClassEntity).find();

  if (!courses.length) {
    throw new NotFound('No registered courses found.')
  }

 return courses;
}

