import { Request, Response } from 'express';
import { createUserUseCase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { log } from '../core/logger/logger';

const postUserUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    log('[postUserUseCaseAdapter]: save user request received with body {}', body, { sensitive: ['password'] });
    const newUser = await createUserUseCase(body, userPrismaRepository as any);
    log(`[createUserUseCaseAdapter]: new user [id]: ${newUser.id} saved`);
    const hateoas = { ...newUser, path: `/users/${newUser.id}` };
    res.status(201).json(hateoas);
  } catch (error) {
    log(`[createUserUseCaseAdapter]: an error occured while saving the new user [${error}]`);
    res.status(422).json({ error });
  }
};

export default postUserUseCaseAdapter;
