import { Invoice } from '../core/entities';
import { prisma } from './prisma';

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
      transactions: true
    }
  });
};

export default {
  get
}
