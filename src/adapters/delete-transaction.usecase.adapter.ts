import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { deleteTransactionUsecase } from '../core/usecases';
import { transactionPrismaRepository } from '../infra';

const deleteTransactionUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const transactionId = params.id;
  log(`[deleteTransactionUseCaseAdapter]: deleting transaction ${transactionId}`);
  await deleteTransactionUsecase(transactionId, req.query?.all === 'true', transactionPrismaRepository as any);
  log(`[deleteTransactionUseCaseAdapter]: transaction deleted`);
  return res.status(204).json();
};

export default deleteTransactionUsecaseAdapter;
