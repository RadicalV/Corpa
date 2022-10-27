import { workerController } from '../controllers/worker.controller';
import { Router } from 'express';

const router = Router();

router.get(
  '/corporations/:corporationId/branches/:branchId/workers',
  workerController.getBranchWorkers
);
router.get(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  workerController.getWorker
);
router.post(
  '/corporations/:corporationId/branches/:branchId/workers',
  workerController.createWorker
);
router.put(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  workerController.updateWorker
);
router.delete(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  workerController.deleteWorker
);

export const workerRouter = router;
