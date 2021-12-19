import { Request, Response, NextFunction } from 'express';
import httpStatus from '../enums/httpStatus';
import Conflict from '../errors/Conflict';
import Invalid from '../errors/Invalid';
import NotFound from '../errors/NotFound';
import ITeacher from '../protocols/ITeacher';
import { createClassSchema } from '../schemas/classesSchemas';
import * as classesService from '../services/classesService';

export async function createTeacher(req: Request, res: Response, next: NextFunction) {
  try {
    const teacherBody: ITeacher = req.body;

    const { error: invalidBody } = createClassSchema.validate(classBody);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const result = await classesService.create(teacherBody);

    return res.status(httpStatus.CREATED).send({
      message: result ? 'Teacher created successfully!' : 'Teacher updated successfully!',
    });
  } catch (error) {
    console.error(error.message);
    if (error instanceof Invalid) return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatus.CONFLICT).send(error.message);
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}

export async function getTeachersByCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const courseId = Number(req.query.courseId); 

    const result = await classesService.getByCourse(courseId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.error(error.message);
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}
