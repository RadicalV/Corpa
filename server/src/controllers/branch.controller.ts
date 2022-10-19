import { branchService } from '../services/branch.service';
import { NextFunction, Request, Response } from 'express';

const getBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branches = await branchService.getBranches();
    res.status(200).send(branches);
  } catch (error) {
    next(error);
  }
};

const getBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branch = await branchService.getBranch(req.params.id);
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

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

const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const userId = req.tokenData;
    const branch = await branchService.createBranch(req.body);
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const branch = await branchService.updateBranch(req.body, req.params.id);
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userId = req.tokenData;
    const branch = await branchService.deleteBranch(req.params.id);
    res.status(200).send(branch);
  } catch (error) {
    next(error);
  }
};

export const branchController = {
  getBranches,
  getBranch,
  getCorporationBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};
