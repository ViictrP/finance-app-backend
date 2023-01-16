import { CreditCard, Invoice, User } from '../core/entities';
import { prisma } from './prisma';

const create = (creditCard: CreditCard) => {
  return prisma.creditCard.create({
    data: {
      ...creditCard,
      user: {
        connect: {
          id: creditCard.user.id
        }
      },
      invoices: {
        create: [...creditCard.invoices] as any[]
      }
    }
  });
};

const get = (filter: CreditCard) => {
  let query = {};

  if (!!filter.id) {
    query = {
      id: filter.id
    }
  }

  if (!!filter.number) {
    query = {
      number_userId: {
        number: filter.number,
        userId: filter.user.id
      }
    };
  }

  return prisma.creditCard.findUnique({
    where: {
      ...query
    },
    include: {
      invoices: {
        include: {
          transactions: true
        }
      }
    }
  });
};

const getMany = (user: User) => {
  return prisma.creditCard.findMany({
    where: {
      user: {
        id: user.id
      }
    },
    include: {
      invoices: {
        include: {
          transactions: true
        }
      }
    }
  });
};

const update = (creditCard: CreditCard) => {
  return prisma.creditCard.update({
    where: {
      id: creditCard.id
    },
    data: {
      title: creditCard.title,
      description: creditCard.description,
      number: creditCard.number,
      backgroundColor: creditCard.backgroundColor,
      invoiceClosingDay: creditCard.invoiceClosingDay
    }
  });
};

export default {
  create,
  get,
  getMany,
  update
};
