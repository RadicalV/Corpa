import { userController } from '../controllers/user.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/me', authMiddleware, userController.getUserData);
router.get('/users/me/corporations', authMiddleware, userController.getUserCorporations);
router.get('/users/:id', authMiddleware, userController.getUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export const userRouter = router;
