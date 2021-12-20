import { getRepository } from 'typeorm';
import CourseEntity from "../../src/entities/CourseEntity";

export async function clearDatabase() {
  await getRepository(CourseEntity).delete({});
}
