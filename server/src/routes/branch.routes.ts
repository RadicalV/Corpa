import { branchController } from '../controllers/branch.controller';
import { Router } from 'express';

const router = Router();

router.get('/branches/corporation/:corporationId', branchController.getBranches);
router.get('/branches/:id', branchController.getBranch);
router.post('/branches', branchController.createBranch);
router.put('/branches/:id', branchController.updateBranch);
router.delete('/branches/:id', branchController.deleteBranch);

export const branchRouter = router;
