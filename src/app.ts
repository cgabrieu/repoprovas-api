import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import router from './router';
import errorMiddleware from './middlewares/errorMiddleware';
import connectDatabase from "./connection/database";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorMiddleware);



export async function init() {
  await connectDatabase();
}

export default app;
