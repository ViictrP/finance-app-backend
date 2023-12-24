import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import createTransactionUsecase from '../core/usecases/create-transaction.usecase';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import userPrismaRepository from '../infra/user.prisma-repository';
import transactionPrismaRepository from '../infra/transaction.prisma-repository';
import UserRepository from '../core/repositories/user.repository';
import TransactionRepository from '../core/repositories/transaction.repository';

const postTransactionUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.user = user;
  log(
    '[postTransactionUsecaseAdapter]: save new transaction request received with body {}',
    body
  );
  const newCreditCard = await createTransactionUsecase(
    body,
    creditCardPrismaRepository as any,
    userPrismaRepository as unknown as UserRepository,
    transactionPrismaRepository as unknown as TransactionRepository
  );
  log(
    `[createTransactionUseCaseAdapter]: new transaction [id]: ${newCreditCard.id} saved`
  );
  const hateoas = {
    ...newCreditCard,
    path: `/transactions/${newCreditCard.id}`
  };
  return res.status(201).json(hateoas);
};

export default postTransactionUsecaseAdapter;
