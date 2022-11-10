import { authController } from '../controllers/auth.controller';
import { Router } from 'express';

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

export const authRouter = router;
