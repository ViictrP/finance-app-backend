import { User } from '../core/entities';
import { prisma } from './prisma';
import { MONTHS } from '../core/enums/month.enum';

const monthStart = new Date();
const monthEnd = new Date();
monthStart.setDate(1);
monthEnd.setDate(1);
monthEnd.setMonth(monthStart.getMonth() + 1);

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
      invoice: null,
      date: {
        gte: monthStart.toISOString(),
        lte: monthEnd.toISOString()
      }
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
