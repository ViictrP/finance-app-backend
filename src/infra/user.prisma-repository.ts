import { User } from '../core/entities';
import { prisma } from './prisma';
import { MONTHS } from '../core/enums/month.enum';

const getIncludes = (month?: string, year?: number) => {
  const monthStart = new Date();
  const monthEnd = new Date();
  monthStart.setDate(1);
  monthEnd.setDate(1);
  monthEnd.setMonth(monthStart.getMonth() + 1);
  return {
    creditCards: {
      where: {
        deleted: false,
      },
      include: {
        invoices: {
          where: {
            month: month ?? MONTHS[monthStart.getMonth()],
            year: year ?? monthStart.getFullYear(),
          },
          include: {
            transactions: {
              where: {
                deleted: false,
              },
            },
          },
        },
      },
    },
    recurringExpenses: {
      where: {
        deleted: false,
        createdAt: {
          lte: month && year ? new Date(year, MONTHS.indexOf(month), 31).toISOString() : monthEnd.toISOString(),
        }
      },
    },
    transactions: {
      where: {
        invoice: null,
        date: {
          gte: month && year ? new Date(year, MONTHS.indexOf(month), 1).toISOString() : monthStart.toISOString(),
          lte: month && year ? new Date(year, MONTHS.indexOf(month), 31).toISOString() : monthEnd.toISOString(),
        },
        deleted: false,
      },
    },
  };
};

const create = (newUser: User) => {
  return prisma.user.create({
    data: {
      ...newUser,
      deleted: false,
      deleteDate: null
    } as any,
    include: getIncludes(),
  });
};

const get = (filter: User, month?: string, year?: number) => {
  return prisma.user.findUnique({
    where: { ...filter },
    include: getIncludes(month, year),
  });
};

const update = (user: User) => {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    } as any,
    include: getIncludes(),
  });
};

const deleteOne = (user: User) => {
  return prisma.user.update({
    where: {
      id: user.id
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
  update,
  deleteOne
};
