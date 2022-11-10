import { HttpException } from '../exceptions/httpException';
import { verifyToken } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer')) return next(new HttpException(401, 'Unauthorized'));

  const token = auth.slice(7);

  try {
    const decoded = verifyToken(token);
    req.tokenData = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    next(new HttpException(401, 'Unauthorized'));
  }
};
