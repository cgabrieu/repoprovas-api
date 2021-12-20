/* eslint-disable no-undef */
import 'reflect-metadata';
import { mock } from 'jest-mock-extended';
import { getConnection } from 'typeorm';
import supertest from 'supertest';
import faker from 'faker';
import app, { init } from '../../src/app';
import { createCourse } from '../factories/coursesFactory';
import { clearDatabase } from '../utils/database';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe('POST /courses', () => {
  it('should return invalid error when course name is invalid', async () => {
    const result = await supertest(app)
      .post('/courses')
      .send({
        name: faker.lorem.text(2),
      });

    console.log(result);
  });
});
