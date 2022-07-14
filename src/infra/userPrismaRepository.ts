import { User } from '../core/entities';
import { prisma } from './prisma';

const includes = {
  creditCards: {
    include: {
      invoices: {
        include: {
          transactions: true
        }
      }
    }
  },
  transactions: true
}

const create = (newUser: User) => {
  return prisma.user.create({
    data: { ...newUser },
    include: includes
  });
};

const get = (filter: User) => {
  return prisma.user.findUnique({
    where: { ...filter },
    include: includes
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
    include: includes
  });
};

export default {
  create,
  get,
  update,
};
