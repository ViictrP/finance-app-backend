import { Request, Response } from 'express';
import { createUserUsecase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { log } from '../core/logger/logger';

const postUserUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    log('[postUserUsecaseAdapter]: save user request received with body {}', body, { sensitive: ['password'] });
    const newUser = await createUserUsecase(body, userPrismaRepository as any);
    log(`[createUserUseCaseAdapter]: new user [id]: ${newUser.id} saved`);
    const hateoas = { ...newUser, path: `/users/${newUser.id}` };
    res.status(201).json(hateoas);
  } catch (error) {
    log(`[createUserUseCaseAdapter]: an error occured while saving the new user [${error}]`);
    res.status(422).json({ error });
  }
};

export default postUserUsecaseAdapter;
