import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getCreditCardsUsecase } from '../core/usecases';

const getCreditCardsUsecaseAdapter = async (req: Request, res: Response) => {
  const { user } = res.locals;
  log(`[getCreditCardsUseCaseAdapter]: getting user ${user.id} credit cards`);
  const creditCards = await getCreditCardsUsecase(user as any, creditCardPrismaRepository as any);
  log(`[getCreditCardsUseCaseAdapter]: ${creditCards.length} credit cards found`);
  return res.status(200).json(creditCards);
};

export default getCreditCardsUsecaseAdapter;
