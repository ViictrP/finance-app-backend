import { MonthClosure } from '../core/entities';
import { prisma } from './prisma';

const create = (monthClosure: MonthClosure) => {
  return prisma.monthClosure.create({
    data: {
      ...monthClosure,
      deleted: false,
      deleteDate: new Date(),
      user: {
        connect: {
          id: monthClosure.user.id

        }
      }
    }
  });
};

export default {
  create
};
