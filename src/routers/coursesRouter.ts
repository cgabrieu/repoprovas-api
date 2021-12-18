import { Router } from 'express';
import * as coursesController from '../controllers/coursesController'

const router: Router = Router();

router.post('/', coursesController.createCourse);

export default router;
