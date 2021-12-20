import { Router } from 'express';
import coursesRouter from './routers/coursesRouter';
import classesRouter from './routers/classesRouter';
import teachersRouter from './routers/teachersRouter';
import testsRouter from './routers/testsRouter';
import contributeRouter from './routers/contributeRouter';

const router: Router = Router();

router.use('/courses', coursesRouter);
router.use('/classes', classesRouter);
router.use('/teachers', teachersRouter);
router.use('/tests', testsRouter);
router.use('/contribute', contributeRouter);

export default router;
