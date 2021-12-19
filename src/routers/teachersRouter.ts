import { Router } from 'express';
import * as teachersController from '../controllers/teachersController'

const router: Router = Router();

router.post('/', teachersController.createTeacher);
router.get('/', teachersController.getTeachersByCourse);

export default router;
