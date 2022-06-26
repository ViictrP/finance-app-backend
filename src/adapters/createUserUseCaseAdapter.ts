import { Request, Response } from 'express';
import createUserUseCase from '../core/usecases/createUserUseCase';
import repository from '../infra/createUserPrismaRepository';
import { log } from '../core/logger/logger';

const createUserUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    log('[createUserUseCaseAdapter]: save user request received with body {}', body, { sensitive: ['password'] });
    const newUser = await createUserUseCase(body, repository);
    log(`[createUserUseCaseAdapter]: new user [id]: ${newUser.id} saved`);
    const hateoas = { ...newUser, path: `/users/${newUser.id}` };
    res.status(201).json(hateoas);
  } catch (error) {
    log(`[createUserUseCaseAdapter]: an error occured while saving the new user [${error}]`);
    res.status(422).json({ error });
  }
};

export default createUserUseCaseAdapter;
