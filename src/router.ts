import { Router } from 'express';
import coursesRouter from './routers/coursesRouter';
import classesRouter from './routers/classesRouter';
import teachersRouter from './routers/teachersRouter';

const router: Router = Router();

router.use('/courses', coursesRouter);
router.use('/classes', classesRouter);
router.use('/teachers', teachersRouter);

export default router;
