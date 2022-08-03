import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { getInvoiceUseCase } from '../core/usecases';
import { invoicePrismaRepository } from '../infra';

const getInvoiceUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params, query } = req;
    log(`[getInvoiceUseCaseAdapter]: get invoice request received, getting invoice by month ${query.month} and year ${query.year}`);
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
