import faker from 'faker';
import { getRepository } from "typeorm";
import CourseEntity from "../../src/entities/CourseEntity";

export async function createCourse () {
  const user = getRepository(CourseEntity).create({
      name: faker.random.words(2),
  });

  await getRepository(CourseEntity).save(user);

  return user;
}