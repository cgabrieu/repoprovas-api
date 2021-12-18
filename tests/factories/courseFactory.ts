import { getRepository } from "typeorm";

import CourseEntity from "../../src/entities/CourseEntity";

export async function createUser () {
  const user = await getRepository(CourseEntity).create({
    name: faker
  });

  await getRepository(CourseEntity).save(user);

  return user;
}