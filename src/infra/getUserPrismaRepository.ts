import User from '../core/entities/User';
import { prisma } from './prisma';

const getUserPrismaRepository = (filter: User) => {
  return prisma.user.findUnique({
    where: { ...filter }
  });
};

export default {
  get: getUserPrismaRepository
};
