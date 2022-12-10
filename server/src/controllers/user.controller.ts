import { userService } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers(req.tokenData.role);
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(req.tokenData.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const userId = req.tokenData.id;

    const user = await userService.updateUser(req.body, userId, req.tokenData.role);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.tokenData.id;
    const user = await userService.deleteUser(userId, req.tokenData.role);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const getUserCorporations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporations = await userService.getUserCorporations(req.tokenData.id);
    res.status(200).send(corporations);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserCorporations,
};
