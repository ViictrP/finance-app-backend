import { log } from '../core/logger/logger';
import { getBalanceUsecase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';

const getBalanceUsecaseAdapter = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { month, year } = req.query as unknown as { month: string, year: number };
  log(`[getBalanceUseCaseAdapter]: getting user ${user?.id} balance by month and year`);
  const balance = await getBalanceUsecase({ user, month, year: Number(year) }, userPrismaRepository as any);
  log(`[getBalanceUseCaseAdapter]: balance calculated`);
  return res.status(200).json(balance);
};

export default getBalanceUsecaseAdapter;
