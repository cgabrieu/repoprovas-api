import { Request, Response, NextFunction } from 'express';
import httpStatus from '../enums/httpStatus';
import Conflict from '../errors/Conflict';
import Invalid from '../errors/Invalid';
import NotFound from '../errors/NotFound';
import IClass from '../protocols/IClass';
import { createClassSchema } from '../schemas/classesSchemas';
import * as classesService from '../services/classesService';

export async function createClass(req: Request, res: Response, next: NextFunction) {
  try {
    const classBody: IClass = req.body;

    const { error: invalidBody } = createClassSchema.validate(classBody);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const result = await classesService.create(classBody);

    return res.status(httpStatus.CREATED).send({
      message: result ? 'Class created successfully!' : 'Class updated successfully!',
    });
  } catch (error) {
    console.error(error.message);
    if (error instanceof Invalid) return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatus.CONFLICT).send(error.message);
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}

export async function getClassesByCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const courseId = req.params.courseId; 

    const result = await classesService.getByCourse(req.);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.error(error.message);
    if (error instanceof NotFound) return res.status(httpStatus.NOT_FOUND).send(error.message);
    return next();
  }
}
