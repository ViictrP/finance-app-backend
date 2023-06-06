import { RecurringExpense } from '../core/entities';
import { prisma } from './prisma';

const create = (recurringExpense: RecurringExpense) => {
  return prisma.recurringExpense.create({
    data: {
      ...recurringExpense,
      user: {
        connect: {
          id: recurringExpense.user.id
        }
      }
    }
  });
};

const get = (recurringExpense: RecurringExpense) => {
  return prisma.recurringExpense.findUnique({
    where: {
      id: recurringExpense.id
    }
  });
};

const deleteOne = (recurringExpense: RecurringExpense) => {
  return prisma.recurringExpense.update({
    where: {
      id: recurringExpense.id
    },
    data: {
      deleted: true,
      deleteDate: new Date()
    }
  });
}

export default {
  create,
  get,
  deleteOne
}
