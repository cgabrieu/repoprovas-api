import { Router } from 'express';
import coursesRouter from './routers/coursesRouter';
import classesRouter from './routers/classesRouter';
import teachersRouter from './routers/teachersRouter';
import testsRouter from './routers/testsRouter';

const router: Router = Router();

router.use('/courses', coursesRouter);
router.use('/classes', classesRouter);
router.use('/teachers', teachersRouter);
router.use('/tests', testsRouter);

export default router;
