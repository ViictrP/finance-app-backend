import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { deleteCreditCardUsecase } from '../core/usecases';
import { CreditCardRepository } from '../core/repositories';

const deleteCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const creditCardId = params.id;
  log(`[deleteCreditCardUseCaseAdapter]: deleting credit card ${creditCardId}`);
  await deleteCreditCardUsecase(creditCardId, creditCardPrismaRepository as unknown as CreditCardRepository);
  log(`[deleteCreditCardUseCaseAdapter]: credit card deleted`);
  return res.status(204).json();
};

export default deleteCreditCardUsecaseAdapter;
