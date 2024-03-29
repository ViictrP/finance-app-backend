import { Transaction } from '../core/entities';
import { prisma } from './prisma';

const createInvoiceTransaction = (transaction: Transaction) => {
  const invoice = transaction.invoice!;
  return prisma.transaction.create({
    data: {
      amount: transaction.amount,
      description: transaction.description,
      isInstallment: transaction.isInstallment,
      installmentAmount: transaction.installmentAmount ?? 0,
      installmentNumber: transaction.installmentNumber,
      installmentId: transaction.installmentId,
      category: transaction.category,
      date: transaction.date,
      deleted: false,
      deleteDate: null,
      user: {
        connect: {
          id: transaction.user.id,
        },
      },
      invoice: {
        connectOrCreate: {
          where: {
            month_year_creditCardId: {
              month: invoice.month,
              year: invoice.year,
              creditCardId: invoice.creditCard.id,
            }
          },
          create: {
            month: invoice.month,
            year: invoice.year,
            isClosed: false,
            creditCard: {
              connect: {
                id: invoice.creditCard.id,
              },
            },
          },
        },
      },
    },
  });
};

const create = (transaction: Transaction) => {
  return prisma.transaction.create({
    data: {
      amount: transaction.amount,
      description: transaction.description,
      isInstallment: transaction.isInstallment,
      installmentAmount: transaction.installmentAmount ?? 0,
      installmentId: transaction.installmentId,
      category: transaction.category,
      date: transaction.date,
      deleted: false,
      deleteDate: null,
      user: {
        connect: {
          id: transaction.user.id,
        },
      },
    },
    include: {
      invoice: true,
    },
  });
};

const get = (filter: Transaction) => {
  return prisma.transaction.findUnique({
    where: { ...filter } as any,
  });
};

const update = (transaction: Transaction) => {
  return prisma.transaction.update({
    where: {
      id: transaction.id,
    },
    data: {
      amount: transaction.amount,
      description: transaction.description,
      isInstallment: transaction.isInstallment,
      installmentAmount: transaction.installmentAmount ?? 0,
      category: transaction.category,
      date: transaction.date,
    },
  });
};

const deleteTransaction = (transaction: Transaction, all: boolean) => {
  const data = {
    deleted: true,
    deleteDate: new Date(),
  };
  if (all) {
    return prisma.transaction.updateMany({
      where: {
        installmentId: transaction.installmentId
      },
      data
    });
  }

  return prisma.transaction.update({
    where: {
      id: transaction.id
    },
    data
  });
};

export default {
  createInvoiceTransaction,
  create,
  get,
  update,
  deleteTransaction
};
