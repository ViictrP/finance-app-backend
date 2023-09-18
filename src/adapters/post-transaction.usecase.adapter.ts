import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { createTransactionUsecase } from '../core/usecases';
import { creditCardPrismaRepository, transactionPrismaRepository, userPrismaRepository } from '../infra';
import { TransactionRepository, UserRepository } from '../core/repositories';

const postTransactionUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.user = user;
  log('[postTransactionUsecaseAdapter]: save new transaction request received with body {}', body);
  const newCreditCard = await createTransactionUsecase(body, creditCardPrismaRepository as any, userPrismaRepository as unknown as UserRepository, transactionPrismaRepository as unknown as TransactionRepository);
  log(`[createTransactionUseCaseAdapter]: new transaction [id]: ${newCreditCard.id} saved`);
  const hateoas = { ...newCreditCard, path: `/transactions/${newCreditCard.id}` };
  return res.status(201).json(hateoas);
};

export default postTransactionUsecaseAdapter;
