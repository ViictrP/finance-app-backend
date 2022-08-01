import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import jwt from 'jsonwebtoken';
import { deleteTransactionUseCase } from '../core/usecases';
import { transactionPrismaRepository } from '../infra';

const deleteTransactionUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params, headers } = req;
    const transactionId = params.id;
    log('[deleteTransactionUseCaseAdapter]: delete transaction request received id', '');
    const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
    log('[deleteTransactionUseCaseAdapter]: extracting user data from access token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    log(`[deleteTransactionUseCaseAdapter]: deleting user ${id} transaction ${transactionId}`);
    await deleteTransactionUseCase(transactionId, transactionPrismaRepository as any);
    log(`[deleteTransactionUseCaseAdapter]: transaction deleted`);
    return res.status(204).json();
  } catch (error) {
    log(`[deleteTransactionUseCaseAdapter]: an error occured while deleting the transaction [${error}]`);
    return res.status(422).json({ error });
  }
};

export default deleteTransactionUseCaseAdapter;
