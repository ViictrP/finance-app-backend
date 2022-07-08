import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import repository from '../infra/userPrismaRepository';
import authenticationUseCase from '../auth/usecases/authenticationUseCase';

const authenticationUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    log('[authenticationUseCaseAdapter]: login request received with body {}', body, { sensitive: ['password'] });
    const authentication = await authenticationUseCase(body, repository as any);
    log(`[authenticationUseCaseAdapter]: authenticated successfuly`);
    res.status(201).json(authentication);
  } catch (error) {
    log('[authenticationUseCaseAdapter]: an error occured while doing authentication');
    res.status(422).json({ error });
  }
};

export default authenticationUseCaseAdapter;
