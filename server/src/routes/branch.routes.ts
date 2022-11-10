import { branchController } from '../controllers/branch.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/corporations/:corporationId/branches',
  authMiddleware,
  branchController.getCorporationBranches
);
router.get('/corporations/:corporationId/branches/:id', authMiddleware, branchController.getBranch);
router.post('/corporations/:corporationId/branches', authMiddleware, branchController.createBranch);
router.put(
  '/corporations/:corporationId/branches/:id',
  authMiddleware,
  branchController.updateBranch
);
router.delete(
  '/corporations/:corporationId/branches/:id',
  authMiddleware,
  branchController.deleteBranch
);

export const branchRouter = router;
