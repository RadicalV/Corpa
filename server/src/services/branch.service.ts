import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getCorporationBranches = async (corporationId: string) => {
  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  if (!corporation) {
    throw new HttpException(404, 'Not found!');
  }

  const corporationBranches = await prisma.branch.findMany({
    where: { corporationId: corporationId },
    select: {
      id: true,
      title: true,
      address: true,
    },
  });

  return corporationBranches;
};

const getBranch = async (corporationId: string, id: string) => {
  const branch = await prisma.branch.findFirst({ where: { id, corporationId } });

  if (!branch) {
    throw new HttpException(404, 'Not found!');
  }

  return branch;
};

const createBranch = async (data: { title: string; address: string }, corporationId: string) => {
  const branch = await prisma.branch.create({
    data: { title: data.title, address: data.address, corporationId: corporationId },
  });

  return branch;
};

const updateBranch = async (
  data: { title: string; address: string },
  corporationId: string,
  id: string
) => {
  const tempBranch = await prisma.branch.findFirst({ where: { id, corporationId } });

  if (!tempBranch) {
    throw new HttpException(404, 'Not found!');
  }

  const branch = await prisma.branch.update({
    where: { id: id },
    data: { title: data.title, address: data.address },
  });

  return branch;
};

const deleteBranch = async (corporationId: string, id: string) => {
  const tempBranch = await prisma.branch.findFirst({ where: { id, corporationId } });

  if (!tempBranch) {
    throw new HttpException(404, 'Not found!');
  }

  const branch = await prisma.branch.delete({
    where: { id: id },
  });

  return branch;
};

export const branchService = {
  getBranch,
  getCorporationBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};
