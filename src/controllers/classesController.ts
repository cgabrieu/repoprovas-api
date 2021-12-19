import { Request, Response, NextFunction } from "express";
import httpStatus from "../enums/httpStatus";
import Conflict from "../errors/Conflict";
import Invalid from "../errors/Invalid";
import NotFound from "../errors/NotFound";
import Class from "../protocols/Class";
import { createCourseSchema } from "../schemas/coursesSchemas";
import * as coursesService from '../services/coursesService'

export async function createClass(req: Request, res: Response, next: NextFunction) {
  try {
      const classBody: Class = req.body;

      const { error: invalidBody } = createCourseSchema.validate(classBody);
      if (invalidBody) {
        throw new Invalid(invalidBody.message);
      }

      await coursesService.create(classBody);
      return res.status(httpStatus.CREATED).send({
        message: 'Class created successfully!'
      });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatus.CONFLICT).send(error.message);
    return next();
  }
}

export async function getClassesByCourse(req: Request, res: Response, next: NextFunction) {
  try {
      const result = await coursesService.getByCourse();
      return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}