import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { creditCardPrismaRepository } from '../infra';
import { deleteCreditCardUseCase } from '../core/usecases';

const deleteCreditCardUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const creditCardId = params.id;
    log(`[deleteCreditCardUseCaseAdapter]: deleting credit card ${creditCardId}`);
    await deleteCreditCardUseCase(creditCardId, creditCardPrismaRepository as any);
    log(`[deleteCreditCardUseCaseAdapter]: credit card deleted`);
    return res.status(204).json();
  } catch (error) {
    log(`[deleteCreditCardUseCaseAdapter]: an error occured while deleting the credit card [${error}]`);
    return res.status(422).json({ error });
  }
};

export default deleteCreditCardUseCaseAdapter;
