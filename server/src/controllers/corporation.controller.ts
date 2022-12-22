import { corporationService } from '../services/corporation.service';
import { NextFunction, Request, Response } from 'express';

const getCorporations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporations = await corporationService.getCorporations();
    res.status(200).send(corporations);
  } catch (error) {
    next(error);
  }
};

const getCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporation = await corporationService.getCorporation(req.params.id);
    res.status(200).send(corporation);
  } catch (error) {
    next(error);
  }
};

const createCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const userId = req.tokenData.id;
    const corporation = await corporationService.createCorporation(req.body, userId);
    res.status(201).send(corporation);
  } catch (error) {
    next(error);
  }
};

const updateCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const userId = req.tokenData.id;
    const corporation = await corporationService.updateCorporation(
      req.body,
      req.params.id,
      userId,
      req.tokenData.role
    );
    res.status(200).send(corporation);
  } catch (error) {
    next(error);
  }
};

const deleteCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.tokenData.id;
    const corporation = await corporationService.deleteCorporation(
      req.params.id,
      userId,
      req.tokenData.role
    );
    res.status(200).send(corporation);
  } catch (error) {
    next(error);
  }
};

export const corporationController = {
  getCorporations,
  getCorporation,
  createCorporation,
  updateCorporation,
  deleteCorporation,
};
