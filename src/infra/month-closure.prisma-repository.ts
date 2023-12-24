import { prisma } from './prisma';
import MonthClosure from '../core/entities/month-closure';

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
