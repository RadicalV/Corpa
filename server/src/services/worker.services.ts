import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getWorkers = async () => {
  const workers = await prisma.worker.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      phoneNumber: true,
      position: true,
    },
  });

  return workers;
};

const getWorker = async (id: string) => {
  const worker = await prisma.worker.findUnique({ where: { id } });

  if (!worker) {
    throw new HttpException(404, 'Worker not found!');
  }

  return worker;
};

//can probably change it back to /branches/:branchId/workers
const getBranchWorkers = async (corporationId: string, branchId: string) => {
  // const branchWorkers = await prisma.worker.findMany({
  //   where: { branchId: id },
  //   select: {
  //     id: true,
  //     name: true,
  //     surname: true,
  //     phoneNumber: true,
  //     position: true,
  //   },
  // });

  const branchWorkers = await prisma.$queryRaw`select w.*
                                               from "Worker" w
                                               join "Branch" b on b.id = ${branchId}
                                               join "Corporation" c on c.id = ${corporationId}
                                               where w."branchId" = b.id`;

  return branchWorkers;
};

const createWorker = async (data: {
  name: string;
  surname: string;
  phoneNumber: string;
  position: string;
  branchId: string;
}) => {
  const worker = await prisma.worker.create({
    data: {
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      position: data.position,
      branchId: data.branchId,
    },
  });

  return worker;
};

const updateWorker = async (
  data: { name: string; surname: string; phoneNumber: string; position: string },
  id: string
) => {
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

const deleteWorker = async (id: string) => {
  const worker = await prisma.worker.delete({
    where: { id: id },
  });

  return worker;
};

export const workerService = {
  getWorkers,
  getWorker,
  getBranchWorkers,
  createWorker,
  updateWorker,
  deleteWorker,
};
