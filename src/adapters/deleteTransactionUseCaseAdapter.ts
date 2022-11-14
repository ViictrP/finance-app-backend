import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { deleteTransactionUseCase } from '../core/usecases';
import { transactionPrismaRepository } from '../infra';

const deleteTransactionUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { all } = req.query;
    const transactionId = params.id;
    log(`[deleteTransactionUseCaseAdapter]: deleting transaction ${transactionId}`);
    await deleteTransactionUseCase(transactionId, all === 'true', transactionPrismaRepository as any);
    log(`[deleteTransactionUseCaseAdapter]: transaction deleted`);
    return res.status(204).json();
  } catch (error) {
    log(`[deleteTransactionUseCaseAdapter]: an error occured while deleting the transaction [${error}]`);
    return res.status(422).json({ error });
  }
};

export default deleteTransactionUseCaseAdapter;
