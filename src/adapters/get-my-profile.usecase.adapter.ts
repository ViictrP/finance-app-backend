import { log } from '../core/logger/logger';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getUserUsecase } from '../core/usecases';
import { UserRepository } from '../core/repositories';

const getMyProfileUsecaseAdapter = async (req: Request, res: Response) => {
  const email = req.auth?.payload.email as string;
  log(`[getMyProfileUseCaseAdapter]: getting user ${email} data`);
  const user = await getUserUsecase(
    { email } as any,
    userPrismaRepository as unknown as UserRepository
  );
  log(`[getUserUseCaseAdapter]: user found [id]: ${user.id}`);
  return res.status(200).json(user);
};

export default getMyProfileUsecaseAdapter;
