import { prisma } from './prisma';
import { MONTHS } from '../core/enums/month.enum';
import User from '../core/entities/user';

const getIncludes = (month?: string, year?: number) => {
  const monthStart = new Date();
  const monthEnd = new Date();
  monthStart.setDate(1);
  monthEnd.setDate(1);
  monthEnd.setMonth(monthStart.getMonth() + 1);
  return {
    creditCards: {
      where: {
        deleted: false
      },
      include: {
        invoices: {
          where: {
            month: month ?? MONTHS[monthStart.getMonth()],
            year: year ?? monthStart.getFullYear()
          },
          include: {
            transactions: {
              where: {
                deleted: false
              }
            }
          }
        }
      }
    },
    recurringExpenses: {
      where: {
        deleted: false,
        createdAt: {
          lte:
            month && year
              ? new Date(year, MONTHS.indexOf(month), 31).toISOString()
              : monthEnd.toISOString()
        }
      }
    },
    transactions: {
      where: {
        invoice: null,
        date: {
          gte:
            month && year
              ? new Date(year, MONTHS.indexOf(month), 1).toISOString()
              : monthStart.toISOString(),
          lte:
            month && year
              ? new Date(year, MONTHS.indexOf(month), 31).toISOString()
              : monthEnd.toISOString()
        },
        deleted: false
      }
    },
    monthClosures: {
      take: 5,
      where: {
        year: {
          gte: monthStart.getFullYear() - 1,
          lte: monthEnd.getFullYear()
        },
        deleted: false
      },
      orderBy: [{ index: 'desc' }, { year: 'asc' }]
    }
  } as any;
};

const create = (newUser: User) => {
  return prisma.user.create({
    data: {
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,
      salary: newUser.salary,
      deleted: false,
      deleteDate: null
    } as any,
    include: getIncludes()
  });
};

const get = (filter: User, month?: string, year?: number) => {
  return prisma.user.findUnique({
    where: { ...filter, deleted: false } as any,
    include: getIncludes(month, year)
  });
};

const update = (user: User) => {
  return prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      ...user
    } as any,
    include: getIncludes()
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
