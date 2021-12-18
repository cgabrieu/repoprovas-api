import { Request, Response, NextFunction } from "express";
import httpStatus from "../enums/httpStatus";
import Conflict from "../errors/Conflict";
import Invalid from "../errors/Invalid";
import Course from "../protocols/Course";
import { createCourseSchema } from "../schemas/coursesSchemas";
import * as coursesService from '../services/coursesService'

export async function createCourse(req: Request, res: Response, next: NextFunction) {
  try {
      const courseBody: Course = req.body;

      const { error: invalidBody } = createCourseSchema.validate(courseBody);
      if (invalidBody) {
        throw new Invalid(invalidBody.message);
      }

      await coursesService.create(courseBody);
      return res.status(httpStatus.CREATED).send({
        message: 'Course created successfully!'
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
    if (error instanceof Invalid) return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatus.CONFLICT).send(error.message);
    return next();
  }
}