import { User } from '../core/entities';
import { prisma } from './prisma';
import { MONTHS } from '../core/enums/month.enum';

const includes = {
  creditCards: {
    include: {
      invoices: {
        where: {
          month: MONTHS[new Date().getMonth()],
        },
        include: {
          transactions: true,
        },
      },
    },
  },
  transactions: {
    where: {
      invoice: null
    }
  },
};

const create = (newUser: User) => {
  return prisma.user.create({
    data: { ...newUser },
    include: includes,
  });
};

const get = (filter: User) => {
  return prisma.user.findUnique({
    where: { ...filter },
    include: includes,
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
    include: includes,
  });
};

export default {
  create,
  get,
  update,
};
