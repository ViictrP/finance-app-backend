import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getCreditCardsUseCase } from '../core/usecases';

const getCreditCardsUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, headers } = req;
    log('[getCreditCardsUseCaseAdapter]: get user credit cards request received');
    const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
    log('[getCreditCardsUseCaseAdapter]: extracting user data from access token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    log(`[getCreditCardsUseCaseAdapter]: getting user ${id} credit cards`);
    const creditCards = await getCreditCardsUseCase({ id } as any, creditCardPrismaRepository as any);
    log(`[getCreditCardsUseCaseAdapter]: ${creditCards.length} credit cards found`);
    res.status(200).json(creditCards);
  } catch (error) {
    log(`[getCreditCardsUseCaseAdapter]: an error occured while getting user credit cards [${error}]`);
    res.status(422).json({ error });
  }
};

export default getCreditCardsUseCaseAdapter;
