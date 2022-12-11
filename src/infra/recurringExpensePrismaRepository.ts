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

export default {
  create
}
