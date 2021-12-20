import { Router } from 'express';
import * as classesController from '../controllers/classesController'

const router: Router = Router();

router.post('/', classesController.createClass);
router.get('/', classesController.getClassesByCourse);

export default router;
