import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getCreditCardsUsecase } from '../core/usecases';
import { CreditCardRepository } from '../core/repositories';

const getCreditCardsUsecaseAdapter = async (req: Request, res: Response) => {
  const { user } = res.locals;
  log(`[getCreditCardsUseCaseAdapter]: getting user ${user.id} credit cards`);
  const creditCards = await getCreditCardsUsecase(user as any, creditCardPrismaRepository as unknown as CreditCardRepository);
  log(`[getCreditCardsUseCaseAdapter]: ${creditCards.length} credit cards found`);
  return res.status(200).json(creditCards);
};

export default getCreditCardsUsecaseAdapter;
