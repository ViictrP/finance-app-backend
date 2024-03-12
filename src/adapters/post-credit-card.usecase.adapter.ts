import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import userPrismaRepository from '../infra/user.prisma-repository';
import createCreditCardUseCase from '../core/usecases/create-credit-card.usecase';
import UserRepository from '../core/repositories/user.repository';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import CreditCardRepository from '../core/repositories/credit-card.repository';
import { AuthenticatedRequest } from './middlewares/firebase-authentication.middleware';
import CreditCard from '../core/entities/credit-card';
import User from '../core/entities/user';
import { RequestWithProfile } from './middlewares/profile.middleware';

const postCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const body: Partial<CreditCard> = {
    title: req.body.title,
    description: req.body.description,
    number: req.body.number,
    backgroundColor: req.body.backgroundColor,
    invoiceClosingDay: req.body.invoiceClosingDay,
    user: (req as RequestWithProfile).profile
  };
  log('[postCreditCardUsecaseAdapter]: save credit card request received with body {}', body);
  const newCreditCard = await createCreditCardUseCase(
    body as CreditCard,
    userPrismaRepository as unknown as UserRepository,
    creditCardPrismaRepository as unknown as CreditCardRepository
  );
  log(`[createCreditCardUseCaseAdapter]: new credit card [id]: ${newCreditCard.id} saved`);
  const hateoas = {
    ...newCreditCard,
    path: `/credit-cards/${newCreditCard.id}`
  };
  return res.status(201).json(hateoas);
};

export default postCreditCardUsecaseAdapter;
