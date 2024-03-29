import { Request, Response } from 'express';
import { createUserUsecase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { log } from '../core/logger/logger';
import { UserRepository } from '../core/repositories';

const postUserUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  log('[postUserUsecaseAdapter]: save user request received with body {}', body, { sensitive: ['password'] });
  const newUser = await createUserUsecase(body, userPrismaRepository as unknown as UserRepository);
  log(`[createUserUseCaseAdapter]: new user [id]: ${newUser.id} saved`);
  const hateoas = { ...newUser, path: `/users/${newUser.id}` };
  return res.status(201).json(hateoas);
};

export default postUserUsecaseAdapter;
