import { Request, Response, NextFunction } from "express";
import httpStatus from "../enums/httpStatus";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('Error: ', err)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Error - ${err.message}`);
}
