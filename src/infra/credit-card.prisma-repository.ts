import { prisma } from './prisma';
import CreditCard from '../core/entities/credit-card';
import User from '../core/entities/user';

const create = (creditCard: CreditCard) => {
  return prisma.creditCard.create({
    data: {
      ...creditCard,
      deleted: false,
      deleteDate: null,
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

const get = (filter: CreditCard, deleted: boolean) => {
  let query = {};

  if (!!filter.id) {
    query = {
      id: filter.id
    };
  }

  if (!!filter.number) {
    query = {
      number: filter.number,
      userId: (filter as any).userId,
      deleted
    };
  }

  return prisma.creditCard.findFirst({
    where: {
      ...query
    },
    include: {
      invoices: {
        include: {
          transactions: {
            where: {
              deleted: false
            }
          }
        }
      }
    }
  });
};

const getMany = (user: User) => {
  return prisma.creditCard.findMany({
    where: {
      user: {
        id: user.id,
        deleted: false
      },
      deleted: false
    },
    include: {
      invoices: {
        include: {
          transactions: {
            where: {
              deleted: false
            }
          }
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

const deleteOne = (creditCard: CreditCard) => {
  return prisma.creditCard.update({
    where: {
      id: creditCard.id
    },
    data: {
      deleted: true,
      deleteDate: new Date()
    }
  });
};

export default {
  create,
  get,
  getMany,
  update,
  deleteOne
};
