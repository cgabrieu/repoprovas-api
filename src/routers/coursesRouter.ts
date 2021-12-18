import { Router } from 'express';
import * as coursesController from '../controllers/coursesController'

const router: Router = Router();

router.post('/', coursesController.createCourse);
router.get('/', coursesController.listCourses);

export default router;
