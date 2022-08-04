import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { prisma } from '../infra/prisma';

const deleteUserDataUseCaseAdapter = async (req: Request, res: Response) => {
  log('[deleteUserDataUseCaseAdapter]: reset data request received');
  const { user } = res.locals;

  const savedUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });
  await prisma.transaction.deleteMany({
    where: {
      user: {
        id: savedUser!.id
      }
    }
  });
  await prisma.creditCard.deleteMany({
    where: {
      user: {
        ...savedUser
      }
    }
  });
  log('[deleteUserDataUseCaseAdapter]: data wiped');
  res.status(204).json({ message: `user ${savedUser!.email} data wiped` });
};

export default deleteUserDataUseCaseAdapter;
