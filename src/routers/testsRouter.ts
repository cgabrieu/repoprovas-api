import { Router } from 'express';
import * as testsController from '../controllers/testsController'

const router: Router = Router();

router.post('/', testsController.createTest);
// router.get('/', testsController.getTests);

export default router;
