import { prisma } from './prisma';
import Invoice from '../core/entities/invoice';

const get = (invoice: Invoice) => {
  return prisma.invoice.findUnique({
    where: {
      month_year_creditCardId: {
        month: invoice.month,
        year: invoice.year,
        creditCardId: invoice.creditCard.id
      }
    },
    include: {
      transactions: {
        where: {
          deleted: false
        }
      }
    }
  });
};

export default {
  get
};
