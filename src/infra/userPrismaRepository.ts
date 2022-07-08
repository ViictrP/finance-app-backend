import User from '../core/entities/User';
import { prisma } from './prisma';

const create = (newUser: User) => {
  return prisma.user.create({
    data: { ...newUser },
  });
};

const get = (filter: User) => {
  return prisma.user.findUnique({
    where: { ...filter },
  });
};

const update = (user: User) => {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
};

export default {
  create,
  get,
  update,
};
