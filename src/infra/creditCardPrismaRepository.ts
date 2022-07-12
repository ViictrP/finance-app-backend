import { CreditCard, User } from '../core/entities';
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
        create: [...creditCard.invoices]
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
      number: creditCard.number
    }
  });
};

export default {
  create,
  getMany,
  update
};
