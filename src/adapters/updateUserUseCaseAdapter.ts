import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { updateUserUseCase } from '../core/usecases';
import { userPrismaRepository } from '../infra';

const updateUserUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { user } = res.locals;
    body.id = user.id;
    log('[updateUserUseCaseAdapter]: update user request received with body {}', body, { sensitive: ['password'] });
    const newUser = await updateUserUseCase(body, userPrismaRepository as any);
    log(`[updateUserUseCaseAdapter]: user data was updated [id]: ${newUser.id}`);
    const hateoas = { ...newUser, path: `/users/${newUser.id}` };
    res.status(200).json(hateoas);
  } catch (error) {
    log(`[updateUserUseCaseAdapter]: an error occured while saving the new user [${error}]`);
    res.status(422).json({ error });
  }
};

export default updateUserUseCaseAdapter;
