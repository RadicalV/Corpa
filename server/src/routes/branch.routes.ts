import { branchController } from '../controllers/branch.controller';
import { Router } from 'express';

const router = Router();

router.get('/corporations/:corporationId/branches', branchController.getCorporationBranches);
router.get('/corporations/:corporationId/branches/:id', branchController.getBranch);
router.post('/corporations/:corporationId/branches', branchController.createBranch);
router.put('/corporations/:corporationId/branches/:id', branchController.updateBranch);
router.delete('/corporations/:corporationId/branches/:id', branchController.deleteBranch);

export const branchRouter = router;
