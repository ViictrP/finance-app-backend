import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import deleteTransactionUsecase from '../core/usecases/delete-transaction.usecase';
import transactionPrismaRepository from '../infra/transaction.prisma-repository';
import TransactionRepository from '../core/repositories/transaction.repository';

const deleteTransactionUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const transactionId = params.id;
  log(
    `[deleteTransactionUseCaseAdapter]: deleting transaction ${transactionId}`
  );
  await deleteTransactionUsecase(
    transactionId,
    req.query?.all === 'true',
    transactionPrismaRepository as unknown as TransactionRepository
  );
  log(`[deleteTransactionUseCaseAdapter]: transaction deleted`);
  return res.status(204).json();
};

export default deleteTransactionUsecaseAdapter;
