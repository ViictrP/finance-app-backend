import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import jwt from 'jsonwebtoken';
import { createTransactionUseCase } from '../core/usecases';
import { creditCardPrismaRepository, transactionPrismaRepository, userPrismaRepository } from '../infra';

const createTransactionUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, headers } = req;
    const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
    log('[createTransactionUseCaseAdapter]: extracting user data from access token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    body.user = { id };
    log('[createTransactionUseCaseAdapter]: save new transaction request received with body {}', body);
    const newCreditCard = await createTransactionUseCase(body, creditCardPrismaRepository as any, userPrismaRepository as any, transactionPrismaRepository as any);
    log(`[createTransactionUseCaseAdapter]: new transaction [id]: ${newCreditCard.id} saved`);
    const hateoas = { ...newCreditCard, path: `/transactions/${newCreditCard.id}` };
    res.status(201).json(hateoas);
  } catch (error) {
    log(`[createTransactionUseCaseAdapter]: an error occured while saving the new transaction [${error}]`);
    res.status(422).json({ error });
  }
};

export default createTransactionUseCaseAdapter;
