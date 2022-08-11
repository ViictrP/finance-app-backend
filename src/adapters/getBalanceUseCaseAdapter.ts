import { log } from '../core/logger/logger';
import { getBalanceUseCase } from '../core/usecases';
import { userPrismaRepository } from '../infra';
import { Request, Response } from 'express';

const getBalanceUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { month, year } = req.query as unknown as { month: string, year: number };
    log(`[getBalanceUseCaseAdapter]: getting user ${user.id} balance by month and year`);
    const balance = await getBalanceUseCase({ user, month, year: Number(year) }, userPrismaRepository as any);
    log(`[getBalanceUseCaseAdapter]: balance calculated`);
    res.status(200).json(balance);
  } catch (error) {
    log(`[getBalanceUseCaseAdapter]: an error occured while calculating the balance [${error}]`);
    res.status(422).json({ error });
  }
};

export default getBalanceUseCaseAdapter;
