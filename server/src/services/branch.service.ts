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

const createBranch = async (
  data: { title: string; address: string },
  corporationId: string,
  userId: string
) => {
  if (!data.title || !data.address) {
    throw new HttpException(400, 'Bad request!');
  }

  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  if (!corporation) throw new HttpException(404, 'Not found');

  if (corporation.creatorUserId !== userId) throw new HttpException(401, 'Unauthorized');

  const branch = await prisma.branch.create({
    data: { title: data.title, address: data.address, corporationId: corporationId },
  });

  return branch;
};

const updateBranch = async (
  data: { title: string; address: string },
  corporationId: string,
  id: string,
  userId: string
) => {
  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  const tempBranch = await prisma.branch.findFirst({ where: { id, corporationId } });

  if (!tempBranch || !corporation) {
    throw new HttpException(404, 'Not found!');
  }

  if (corporation.creatorUserId !== userId) throw new HttpException(401, 'Unauthorized');

  const branch = await prisma.branch.update({
    where: { id: id },
    data: { title: data.title, address: data.address },
  });

  return branch;
};

const deleteBranch = async (corporationId: string, id: string, userId: string) => {
  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });
  const tempBranch = await prisma.branch.findFirst({ where: { id, corporationId } });

  if (!tempBranch || !corporation) {
    throw new HttpException(404, 'Not found!');
  }

  if (corporation.creatorUserId !== userId) throw new HttpException(401, 'Unauthorized');

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
