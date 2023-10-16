import { log } from '../core/logger/logger';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getUserUsecase } from '../core/usecases';
import { UserRepository } from '../core/repositories';
import { AuthenticatedRequest } from './middlewares/firebase-authentication.middleware';

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
