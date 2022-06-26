import User from '../core/entities/User';
import { prisma } from './prisma';

const createUserPrismaRepository = (newUser: User) => {
  return prisma.user.create({
    data: { ...newUser }
  });
};

export default {
  create: createUserPrismaRepository
};
