import { getRepository } from 'typeorm';
import CourseEntity from '../entities/CourseEntity';
import Conflict from '../errors/Conflict';
import Course from '../protocols/Course';

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

 return courses;
}

