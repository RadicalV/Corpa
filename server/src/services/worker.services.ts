import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getBranchWorkers = async (corporationId: string, branchId: string) => {
  const branch = await prisma.branch.findFirst({ where: { id: branchId, corporationId } });

  if (!branch) {
    throw new HttpException(404, 'Not found!');
  }

  const branchWorkers = await prisma.worker.findMany({
    where: { branchId: branchId },
    select: {
      id: true,
      name: true,
      surname: true,
      phoneNumber: true,
      position: true,
    },
  });

  return branchWorkers;
};

const getWorker = async (corporationId: string, branchId: string, id: string) => {
  const branch = await prisma.branch.findFirst({ where: { id: branchId, corporationId } });

  if (!branch) {
    throw new HttpException(404, 'Not found!');
  }

  const worker = await prisma.worker.findFirst({ where: { id, branchId } });

  if (!worker) {
    throw new HttpException(404, 'Not found!');
  }

  return worker;
};

const createWorker = async (
  data: {
    name: string;
    surname: string;
    phoneNumber: string;
    position: string;
  },
  corporationId: string,
  branchId: string,
  userId: string,
  role: string
) => {
  if (!data.name || data.surname || data.phoneNumber || data.position) {
    throw new HttpException(400, 'Bad request!');
  }

  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  const branch = await prisma.branch.findFirst({ where: { id: branchId, corporationId } });

  if (!branch || !corporation) {
    throw new HttpException(404, 'Not found!');
  }

  if (corporation.creatorUserId !== userId && role !== 'ADMIN')
    throw new HttpException(403, 'Forbidden');

  const worker = await prisma.worker.create({
    data: {
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      position: data.position,
      branchId: branchId,
    },
  });

  return worker;
};

const updateWorker = async (
  data: { name: string; surname: string; phoneNumber: string; position: string },
  corporationId: string,
  branchId: string,
  id: string,
  userId: string,
  role: string
) => {
  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  const branch = await prisma.branch.findFirst({ where: { id: branchId, corporationId } });

  const workerTemp = await prisma.worker.findFirst({ where: { id, branchId } });

  if (!branch || !workerTemp || !corporation) {
    throw new HttpException(404, 'Not found!');
  }

  if (corporation.creatorUserId !== userId && role !== 'ADMIN')
    throw new HttpException(403, 'Forbidden');

  const worker = await prisma.worker.update({
    where: { id: id },
    data: {
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      position: data.position,
    },
  });

  return worker;
};

const deleteWorker = async (
  corporationId: string,
  branchId: string,
  id: string,
  userId: string,
  role: string
) => {
  const corporation = await prisma.corporation.findUnique({ where: { id: corporationId } });

  const branch = await prisma.branch.findFirst({ where: { id: branchId, corporationId } });

  const workerTemp = await prisma.worker.findFirst({ where: { id, branchId } });

  if (!branch || !workerTemp || !corporation) {
    throw new HttpException(404, 'Not found!');
  }

  if (corporation.creatorUserId !== userId && role !== 'ADMIN')
    throw new HttpException(403, 'Forbidden');

  const worker = await prisma.worker.delete({
    where: { id: id },
  });

  return worker;
};

export const workerService = {
  getBranchWorkers,
  getWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};
