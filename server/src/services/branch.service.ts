import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getBranches = async (id: string) => {
  const branches = await prisma.branch.findMany({
    where: { corporationId: id },
    select: {
      id: true,
      title: true,
      address: true,
    },
  });

  if (!branches) {
    throw new HttpException(404, 'Branches not found');
  }
  return branches;
};

const getBranch = async (id: string) => {
  const branch = await prisma.branch.findUnique({ where: { id } });

  if (!branch) {
    throw new HttpException(404, 'Branch not found!');
  }

  return branch;
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
  createBranch,
  updateBranch,
  deleteBranch,
};
