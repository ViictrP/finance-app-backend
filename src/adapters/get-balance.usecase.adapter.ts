import { log } from '../core/logger/logger';
import { getBalanceUsecase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { UserRepository } from '../core/repositories';
import { AuthenticatedRequest } from './middlewares/firebase-authentication.middleware';

const getBalanceUsecaseAdapter = async (req: Request, res: Response) => {
  const email = (req as AuthenticatedRequest).email;
  const { month, year } = req.query as unknown as {
    month: string;
    year: number;
  };
  log(
    `[getBalanceUseCaseAdapter]: getting user's balance by email ${email}, month and year`
  );
  const balance = await getBalanceUsecase(
    { email, month, year: Number(year) },
    userPrismaRepository as unknown as UserRepository
  );
  log(`[getBalanceUseCaseAdapter]: balance calculated`);
  return res.status(200).json(balance);
};

export default getBalanceUsecaseAdapter;
