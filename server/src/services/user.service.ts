import { Role } from '@prisma/client';
import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getUsers = async (role: string) => {
  if (role !== 'ADMIN') throw new HttpException(403, 'Forbidden');

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdCorporations: true,
    },
  });

  return users;
};

const getUser = async (id: string, role: string) => {
  if (role !== 'ADMIN') throw new HttpException(403, 'Forbidden');

  const user = await prisma.user.findFirst({
    where: { id },
    select: { id: true, email: true, username: true, role: true, createdCorporations: true },
  });

  if (!user) {
    throw new HttpException(404, 'Not found!');
  }

  return user;
};

const getUserData = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id },
    select: { id: true, email: true, username: true, role: true, createdCorporations: true },
  });

  if (!user) {
    throw new HttpException(404, 'Not found!');
  }

  return user;
};

const updateUser = async (data: { username: string; role: Role }, id: string, role: string) => {
  if (role !== 'ADMIN') throw new HttpException(403, 'Forbidden');

  const user = await prisma.user.update({
    where: { id: id },
    data: { username: data.username, role: data.role },
  });

  return user;
};

const deleteUser = async (userId: string, role: string) => {
  if (role !== 'ADMIN') throw new HttpException(403, 'Forbidden');
  const user = await prisma.user.delete({
    where: { id: userId },
  });

  return user;
};

const getUserCorporations = async (id: string) => {
  const corporations = await prisma.corporation.findMany({ where: { creatorUserId: id } });
  return corporations;
};

export const userService = {
  getUsers,
  getUser,
  getUserData,
  updateUser,
  deleteUser,
  getUserCorporations,
};
