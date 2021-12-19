import { Router } from 'express';
import * as classesController from '../controllers/classesController'

const router: Router = Router();

router.post('/', classesController.createClass);
router.get('/:courseId', classesController.getClassesByCourse);

export default router;
