import { workerService } from '../services/worker.services';
import { NextFunction, Request, Response } from 'express';

const getWorkers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workers = await workerService.getWorkers(req.params.branchId);
    res.status(200).send(workers);
  } catch (error) {
    next(error);
  }
};

const getWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const worker = await workerService.getWorker(req.params.id);
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const createWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const userId = req.tokenData;
    const worker = await workerService.createWorker(req.body);
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const updateWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const worker = await workerService.updateWorker(req.body, req.params.id);
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const deleteWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const worker = await workerService.deleteWorker(req.params.id);
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

export const workerController = {
  getWorkers,
  getWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};
