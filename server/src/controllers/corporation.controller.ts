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
    //const userId = req.tokenData;
    const corporation = await corporationService.createCorporation(req.body);
    res.status(200).send(corporation);
  } catch (error) {
    next(error);
  }
};

const updateCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const corporation = await corporationService.updateCorporation(req.body, req.params.id);
    res.status(200).send(corporation);
  } catch (error) {
    next(error);
  }
};

const deleteCorporation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const corporation = await corporationService.deleteCorporation(req.params.id);
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
