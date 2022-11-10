import { workerController } from '../controllers/worker.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/corporations/:corporationId/branches/:branchId/workers',
  authMiddleware,
  workerController.getBranchWorkers
);
router.get(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  authMiddleware,
  workerController.getWorker
);
router.post(
  '/corporations/:corporationId/branches/:branchId/workers',
  authMiddleware,
  workerController.createWorker
);
router.put(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  authMiddleware,
  workerController.updateWorker
);
router.delete(
  '/corporations/:corporationId/branches/:branchId/workers/:id',
  authMiddleware,
  workerController.deleteWorker
);

export const workerRouter = router;
