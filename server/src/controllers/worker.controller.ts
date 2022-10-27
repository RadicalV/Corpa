import { workerService } from '../services/worker.services';
import { NextFunction, Request, Response } from 'express';

const getBranchWorkers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branchWorkers = await workerService.getBranchWorkers(
      req.params.corporationId,
      req.params.branchId
    );
    res.status(200).send(branchWorkers);
  } catch (error) {
    next(error);
  }
};

const getWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const worker = await workerService.getWorker(
      req.params.corporationId,
      req.params.branchId,
      req.params.id
    );
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const createWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const userId = req.tokenData;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const worker = await workerService.createWorker(
      req.body,
      req.params.corporationId,
      req.params.branchId
    );
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const updateWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const worker = await workerService.updateWorker(
      req.body,
      req.params.corporationId,
      req.params.branchId,
      req.params.id
    );
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

const deleteWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const worker = await workerService.deleteWorker(
      req.params.corporationId,
      req.params.branchId,
      req.params.id
    );
    res.status(200).send(worker);
  } catch (error) {
    next(error);
  }
};

export const workerController = {
  getBranchWorkers,
  getWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};
