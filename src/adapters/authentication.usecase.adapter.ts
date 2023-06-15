import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { userPrismaRepository } from '../infra';
import authenticationUsecase from '../auth/usecases/authentication.usecase';

const authenticationUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    log('[authenticationUsecaseAdapter]: login request received with body {}', body, { sensitive: ['password'] });
    const authentication = await authenticationUsecase(body, userPrismaRepository as any);
    log(`[authenticationUseCaseAdapter]: authenticated successfuly`);
    res.status(201).json(authentication);
  } catch (error) {
    log('[authenticationUsecaseAdapter]: an error occured while doing authentication');
    res.status(422).json({ error });
  }
};

export default authenticationUsecaseAdapter;
