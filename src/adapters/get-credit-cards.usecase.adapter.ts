import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import { getCreditCardsUsecase } from '../core/usecases';

const getCreditCardsUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    log(`[getCreditCardsUseCaseAdapter]: getting user ${user.id} credit cards`);
    const creditCards = await getCreditCardsUsecase(user as any, creditCardPrismaRepository as any);
    log(`[getCreditCardsUseCaseAdapter]: ${creditCards.length} credit cards found`);
    res.status(200).json(creditCards);
  } catch (error) {
    log(`[getCreditCardsUseCaseAdapter]: an error occured while getting user credit cards [${error}]`);
    res.status(422).json({ error });
  }
};

export default getCreditCardsUsecaseAdapter;
