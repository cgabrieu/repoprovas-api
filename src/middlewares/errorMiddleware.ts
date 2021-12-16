import { Request, Response, NextFunction } from "express";
import httpStatus from "../enums/httpStatus";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Error - ${err.message}`);
  return next();
}
