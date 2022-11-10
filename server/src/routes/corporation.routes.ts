import { corporationController } from '../controllers/corporation.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/corporations', authMiddleware, corporationController.getCorporations);
router.get('/corporations/:id', authMiddleware, corporationController.getCorporation);
router.post('/corporations', authMiddleware, corporationController.createCorporation);
router.put('/corporations/:id', authMiddleware, corporationController.updateCorporation);
router.delete('/corporations/:id', authMiddleware, corporationController.deleteCorporation);

export const corporationRouter = router;
