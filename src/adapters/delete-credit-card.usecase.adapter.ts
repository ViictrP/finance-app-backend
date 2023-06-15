import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { deleteCreditCardUsecase } from '../core/usecases';

const deleteCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const creditCardId = params.id;
    log(`[deleteCreditCardUseCaseAdapter]: deleting credit card ${creditCardId}`);
    await deleteCreditCardUsecase(creditCardId, creditCardPrismaRepository as any);
    log(`[deleteCreditCardUseCaseAdapter]: credit card deleted`);
    return res.status(204).json();
  } catch (error) {
    log(`[deleteCreditCardUseCaseAdapter]: an error occured while deleting the credit card [${error}]`);
    return res.status(422).json({ error });
  }
};

export default deleteCreditCardUsecaseAdapter;
