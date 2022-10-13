import { workerController } from '../controllers/worker.controller';
import { Router } from 'express';

const router = Router();

router.get('/workers/branch/:branchId', workerController.getWorkers);
router.get('/workers/:id', workerController.getWorker);
router.post('/workers', workerController.createWorker);
router.put('/workers/:id', workerController.updateWorker);
router.delete('/workers/:id', workerController.deleteWorker);

export const workerRouter = router;
