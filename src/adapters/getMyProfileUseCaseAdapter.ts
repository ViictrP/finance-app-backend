import { log } from '../core/logger/logger';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getUserUseCase }  from '../core/usecases';

const getMyProfileUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user.id;
    log(`[getMyProfileUseCaseAdapter]: getting user ${id} data`);
    const user = await getUserUseCase({ id } as any, userPrismaRepository as any);
    log(`[getUserUseCaseAdapter]: user found [id]: ${user.id}`);
    res.status(200).json(user);
  } catch (error) {
    log(`[getUserUseCaseAdapter]: an error occured while getting user data [${error}]`);
    res.status(422).json({ error });
  }
};

export default getMyProfileUseCaseAdapter;
