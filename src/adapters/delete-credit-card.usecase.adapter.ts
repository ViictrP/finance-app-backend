import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { deleteCreditCardUsecase } from '../core/usecases';

const deleteCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const creditCardId = params.id;
  log(`[deleteCreditCardUseCaseAdapter]: deleting credit card ${creditCardId}`);
  await deleteCreditCardUsecase(creditCardId, creditCardPrismaRepository as any);
  log(`[deleteCreditCardUseCaseAdapter]: credit card deleted`);
  return res.status(204).json();
};

export default deleteCreditCardUsecaseAdapter;
