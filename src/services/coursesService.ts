import { getRepository } from 'typeorm';
import CourseEntity from '../entities/CourseEntity';
import Conflict from '../errors/Conflict';
import Course from '../protocols/Course';

export async function create(courseBody: Course) {
  const { name } = courseBody;

  const existsCourse = await getRepository('courses').find({ name });
  if (existsCourse) {
    throw new Conflict('Course already registered.');
  }

  const course = new CourseEntity();
  course.name = name;
  await getRepository('courses').save(course);

  console.log(course);
}
