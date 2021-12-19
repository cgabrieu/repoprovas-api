import { getRepository } from 'typeorm';
import CourseEntity from '../entities/CourseEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import Course from '../protocols/ICourse';

export async function create(courseBody: Course): Promise<CourseEntity> {
  const { name } = courseBody;

  const existsCourse = await getRepository(CourseEntity).findOne({ name });
  if (existsCourse) {
    throw new Conflict('Course already registered.');
  }

  const course = new CourseEntity();
  course.name = name;
  await getRepository(CourseEntity).save(course);

  return course;
}

export async function getList(): Promise<Course[]> {
  const courses: Course[] = await getRepository(CourseEntity).find();

  if (!courses.length) {
    throw new NotFound('No registered courses found.')
  }

 return courses;
}

