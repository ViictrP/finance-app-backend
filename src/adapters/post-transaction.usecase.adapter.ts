import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import createTransactionUsecase from '../core/usecases/create-transaction.usecase';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import transactionPrismaRepository from '../infra/transaction.prisma-repository';
import TransactionRepository from '../core/repositories/transaction.repository';
import Transaction from '../core/entities/transaction';
import { RequestWithProfile } from './middlewares/profile.middleware';

const postTransactionUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;

  const transaction: Partial<Transaction> = {
    amount: body.amount,
    description: body.description,
    isInstallment: body.isInstallment,
    installmentNumber: body.installmentNumber,
    installmentAmount: body.installmentAmount,
    date: body.date,
    invoice: body.invoice,
    user: (req as RequestWithProfile).profile,
    category: body.category
  }

  log('[postTransactionUsecaseAdapter]: save new transaction request received with body {}', body);
  const newTransaction = await createTransactionUsecase(
    transaction as Transaction,
    creditCardPrismaRepository as any,
    transactionPrismaRepository as unknown as TransactionRepository
  );
  log(`[createTransactionUseCaseAdapter]: new transaction [id]: ${newTransaction.id} saved`);
  const hateoas = {
    ...newTransaction,
    path: `/transactions/${newTransaction.id}`
  };
  return res.status(201).json(hateoas);
};

export default postTransactionUsecaseAdapter;
