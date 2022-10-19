import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getBranches = async () => {
  const branches = await prisma.branch.findMany({
    select: {
      id: true,
      title: true,
      address: true,
    },
  });

  return branches;
};

const getBranch = async (id: string) => {
  const branch = await prisma.branch.findUnique({ where: { id } });

  if (!branch) {
    throw new HttpException(404, 'Branch not found!');
  }

  return branch;
};

const getCorporationBranches = async (id: string) => {
  const corporationBranches = await prisma.branch.findMany({
    where: { corporationId: id },
    select: {
      id: true,
      title: true,
      address: true,
    },
  });

  return corporationBranches;
};

const createBranch = async (data: { title: string; address: string; corporationId: string }) => {
  const branch = await prisma.branch.create({
    data: { title: data.title, address: data.address, corporationId: data.corporationId },
  });

  return branch;
};

const updateBranch = async (data: { title: string; address: string }, id: string) => {
  const branch = await prisma.branch.update({
    where: { id: id },
    data: { title: data.title, address: data.address },
  });

  return branch;
};

const deleteBranch = async (id: string) => {
  const branch = await prisma.branch.delete({
    where: { id: id },
  });

  return branch;
};

export const branchService = {
  getBranches,
  getBranch,
  getCorporationBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};
