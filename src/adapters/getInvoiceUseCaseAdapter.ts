import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import jwt from 'jsonwebtoken';
import { getInvoiceUseCase } from '../core/usecases';
import { invoicePrismaRepository } from '../infra';

const getInvoiceUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params, query, headers } = req;
    log('', params);
    log('[getInvoiceUseCaseAdapter]: get invoice request received');
    const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
    log('[getInvoiceUseCaseAdapter]: extracting user data from access token');
    jwt.verify(token, process.env.JWT_SECRET as string);
    log(`[getInvoiceUseCaseAdapter]: getting invoice by month ${query.month} and year ${query.year}`);
    const filter = { creditCard: { id: params.id }, month: query.month, year: Number(query.year) } as any;
    const invoice = await getInvoiceUseCase(filter, invoicePrismaRepository as any);
    log('[getInvoiceUseCaseAdapter]: invoice found [id] ', invoice);
    res.status(200).json(invoice);
  } catch (error) {
    log(`[getCreditCardsUseCaseAdapter]: an error occured while getting user credit cards [${error}]`);
    res.status(404).json({ error: 'not found' });
  }
};

export default getInvoiceUseCaseAdapter;
