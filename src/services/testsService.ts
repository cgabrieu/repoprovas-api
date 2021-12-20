import { getRepository, Not } from 'typeorm';
import ClassEntity from '../entities/ClassEntity';
import CourseEntity from '../entities/CourseEntity';
import TeacherEntity from '../entities/TeacherEntity';
import TestEntity from '../entities/TestEntity';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import Course from '../protocols/ICourse';
import ITest from '../protocols/ITest';

export async function create(testBody: ITest): Promise<TestEntity> {
  const { year, semester, type, link, teacherId, classId } = testBody;

  const existTeacher = await getRepository(TeacherEntity).findOne(teacherId);
  const existClass = await getRepository(ClassEntity).findOne(classId);
  if (!existTeacher || !existClass) {
    throw new NotFound('Teacher or class not found.');
  }

  const test = new TestEntity();
  test.year = year;
  test.semester = semester;
  test.type = type;
  test.link = link;
  test.year = year;
  test.teacher = existTeacher;
  test.class = existClass;

  const existsTest = await getRepository(TestEntity).findOne(test);
  const existsLink = await getRepository(TestEntity).findOne({ link });
  if (existsTest || existsLink) {
    throw new Conflict('Test already registered.');
  }

  await getRepository(TestEntity).save(test);
  return test;
}

export async function get(): Promise<TestEntity[]> {
  const tests = await getRepository(TestEntity).find();

  if (!tests.length) {
    throw new NotFound('No registered tests found.')
  }

 return tests;
}

