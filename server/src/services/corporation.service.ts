import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getCorporations = async () => {
  const corporations = await prisma.corporation.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      creatorUser: { select: { id: true, username: true } },
    },
  });

  if (!corporations) {
    throw new HttpException(404, 'Corporations not found');
  }
  return corporations;
};

const getCorporation = async (id: string) => {
  const corporation = await prisma.corporation.findUnique({ where: { id } });

  if (!corporation) {
    throw new HttpException(404, 'Corporation not found!');
  }

  return corporation;
};

const createCorporation = async (data: { name: string; description: string; userId: string }) => {
  const corporation = await prisma.corporation.create({
    data: { name: data.name, description: data.description, creatorUserId: data.userId },
  });

  return corporation;
};

const updateCorporation = async (data: { name: string; description: string }, id: string) => {
  const corporation = await prisma.corporation.update({
    where: { id: id },
    data: { name: data.name, description: data.description },
  });

  return corporation;
};

const deleteCorporation = async (id: string) => {
  const corporation = await prisma.corporation.delete({
    where: { id: id },
  });

  return corporation;
};

export const corporationService = {
  getCorporations,
  getCorporation,
  createCorporation,
  updateCorporation,
  deleteCorporation,
};
