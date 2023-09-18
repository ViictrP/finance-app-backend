import { log } from '../core/logger/logger';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getUserUsecase }  from '../core/usecases';
import { UserRepository } from '../core/repositories';

const getMyProfileUsecaseAdapter = async (req: Request, res: Response) => {
  const id = res.locals.user.id;
  log(`[getMyProfileUseCaseAdapter]: getting user ${id} data`);
  const user = await getUserUsecase({ id } as any, userPrismaRepository as unknown as UserRepository);
  log(`[getUserUseCaseAdapter]: user found [id]: ${user.id}`);
  return res.status(200).json(user);
};

export default getMyProfileUsecaseAdapter;
