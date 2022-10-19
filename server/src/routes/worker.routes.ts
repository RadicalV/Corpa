import { workerController } from '../controllers/worker.controller';
import { Router } from 'express';

const router = Router();

router.get('/workers', workerController.getWorkers);
router.get('/workers/:id', workerController.getWorker);
router.get(
  '/corporations/:corporationId/branches/:branchId/workers',
  workerController.getBranchWorkers
);
router.post('/workers', workerController.createWorker);
router.put('/workers/:id', workerController.updateWorker);
router.delete('/workers/:id', workerController.deleteWorker);

export const workerRouter = router;
