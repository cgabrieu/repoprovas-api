import { Request, Response, NextFunction } from "express";
import httpStatus from "../enums/httpStatus";
import Conflict from "../errors/Conflict";
import Invalid from "../errors/Invalid";
import NotFound from "../errors/NotFound";
import ITest from "../protocols/ITest";
import { createTestSchema } from "../schemas/testsSchemas";
import * as coursesService from '../services/coursesService'

export async function createTest(req: Request, res: Response, next: NextFunction) {
  try {
      const testBody: ITest = req.body;
      console.log(testBody);
      const { error: invalidBody } = createTestSchema.validate(testBody);
      if (invalidBody) {
        throw new Invalid(invalidBody.message);
      }

      await coursesService.create(testBody);
      return res.status(httpStatus.CREATED).send({
        message: 'Test created successfully!'
      });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatus.CONFLICT).send(error.message);
    return next();
  }
}

export async function listCourses(req: Request, res: Response, next: NextFunction) {
  try {
      const result = await coursesService.getList();
      return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}