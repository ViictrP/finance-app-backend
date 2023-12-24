import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import deleteCreditCardUsecase from '../core/usecases/delete-credit-card.usecase';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import CreditCardRepository from '../core/repositories/credit-card.repository';

const deleteCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const creditCardId = params.id;
  log(`[deleteCreditCardUseCaseAdapter]: deleting credit card ${creditCardId}`);
  await deleteCreditCardUsecase(
    creditCardId,
    creditCardPrismaRepository as unknown as CreditCardRepository
  );
  log(`[deleteCreditCardUseCaseAdapter]: credit card deleted`);
  return res.status(204).json();
};

export default deleteCreditCardUsecaseAdapter;
