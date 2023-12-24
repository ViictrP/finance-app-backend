import { log } from '../core/logger/logger';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from './middlewares/firebase-authentication.middleware';
import getUserUsecase from '../core/usecases/get-user.usecase';
import userPrismaRepository from '../infra/user.prisma-repository';
import UserRepository from '../core/repositories/user.repository';

const getMyProfileUsecaseAdapter = async (req: Request, res: Response) => {
  const email = (req as AuthenticatedRequest).email as string;
  log(`[getMyProfileUseCaseAdapter]: getting user's profile by email ${email}`);
  const user = await getUserUsecase(
    { email } as any,
    userPrismaRepository as unknown as UserRepository
  );
  log(`[getUserUseCaseAdapter]: user found [id]: ${user.id}`);
  return res.status(200).json(user);
};

export default getMyProfileUsecaseAdapter;
