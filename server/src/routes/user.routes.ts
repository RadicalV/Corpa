import { userController } from '../controllers/user.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, userController.getUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);
router.get('/users/:id/corporations', authMiddleware, userController.getUserCorporations);

export const userRouter = router;
