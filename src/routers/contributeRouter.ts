import { Router } from 'express';
import * as AWSController from '../controllers/AWSController'

const router: Router = Router();

router.post('/upload', AWSController.getPreSignedPutUrl);

export default router;
