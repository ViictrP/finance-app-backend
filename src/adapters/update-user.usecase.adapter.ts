import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { updateUserUsecase } from '../core/usecases';
import { userPrismaRepository } from '../infra';

const updateUserUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.id = user.id;
  log('[updateUserUsecaseAdapter]: update user request received with body {}', body, { sensitive: ['password'] });
  const newUser = await updateUserUsecase(body, userPrismaRepository as any);
  log(`[updateUserUseCaseAdapter]: user data was updated [id]: ${newUser.id}`);
  const hateoas = { ...newUser, path: `/users/${newUser.id}` };
  return res.status(200).json(hateoas);
};

export default updateUserUsecaseAdapter;
