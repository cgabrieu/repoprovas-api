import { Router } from 'express';
import exampleRouter from './routers/exampleRouter';

const router: Router = Router();

router.use('/', exampleRouter);

export default router;
