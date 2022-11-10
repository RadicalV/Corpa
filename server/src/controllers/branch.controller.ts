import { branchService } from '../services/branch.service';
import { NextFunction, Request, Response } from 'express';

const getCorporationBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporationBranches = await branchService.getCorporationBranches(
      req.params.corporationId
    );
    res.status(200).send(corporationBranches);
  } catch (error) {
    next(error);
  }
};

const getBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branch = await branchService.getBranch(req.params.corporationId, req.params.id);
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const userId = req.tokenData.id;
    const branch = await branchService.createBranch(req.body, req.params.corporationId, userId);
    res.status(201).send(branch);
  } catch (error) {
    next(error);
  }
};

const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'Bad request!' });
    }

    const userId = req.tokenData.id;

    const branch = await branchService.updateBranch(
      req.body,
      req.params.corporationId,
      req.params.id,
      userId
    );
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.tokenData.id;
    const branch = await branchService.deleteBranch(
      req.params.corporationId,
      req.params.id,
      userId
    );
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

export const branchController = {
  getCorporationBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};
