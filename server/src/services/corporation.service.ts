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

  return corporations;
};

const getCorporation = async (id: string) => {
  const corporation = await prisma.corporation.findUnique({ where: { id } });

  if (!corporation) {
    throw new HttpException(404, 'Corporation not found!');
  }

  return corporation;
};

const createCorporation = async (data: { name: string; description: string }, id: string) => {
  if (!data.name || !data.description) {
    throw new HttpException(400, 'Bad request!');
  }

  const corporation = await prisma.corporation.create({
    data: { name: data.name, description: data.description, creatorUserId: id },
  });

  return corporation;
};

const updateCorporation = async (
  data: { name: string; description: string },
  id: string,
  userId: string
) => {
  const userCorporation = await prisma.corporation.findUnique({ where: { id: id } });

  if (!userCorporation) throw new HttpException(404, 'Not found');

  if (userCorporation.creatorUserId !== userId) throw new HttpException(403, 'Forbidden');

  const corporation = await prisma.corporation.update({
    where: { id: id },
    data: { name: data.name, description: data.description },
  });

  return corporation;
};

const deleteCorporation = async (id: string, userId: string) => {
  const userCorporation = await prisma.corporation.findUnique({ where: { id: id } });

  if (!userCorporation) throw new HttpException(404, 'Not found');

  if (userCorporation.creatorUserId !== userId) throw new HttpException(403, 'Forbidden');

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
