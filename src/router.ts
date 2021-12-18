import { Router } from 'express';
import coursesRouter from './routers/coursesRouter';

const router: Router = Router();

router.use('/courses', coursesRouter);

export default router;
