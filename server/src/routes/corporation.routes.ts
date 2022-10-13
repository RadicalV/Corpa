import { corporationController } from '../controllers/corporation.controller';
import { Router } from 'express';

const router = Router();

router.get('/corporations', corporationController.getCorporations);
router.get('/corporations/:id', corporationController.getCorporation);
router.post('/corporations', corporationController.createCorporation);
router.put('/corporations/:id', corporationController.updateCorporation);
router.delete('/corporations/:id', corporationController.deleteCorporation);

export const corporationRouter = router;
