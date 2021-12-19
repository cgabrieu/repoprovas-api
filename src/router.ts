import { Router } from 'express';
import coursesRouter from './routers/coursesRouter';
import classesRouter from './routers/classesRouter';

const router: Router = Router();

router.use('/courses', coursesRouter);
router.use('/classes', classesRouter);

export default router;
