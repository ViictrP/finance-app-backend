import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { getInvoiceUsecase } from '../core/usecases';
import { invoicePrismaRepository } from '../infra';

const getInvoiceUsecaseAdapter = async (req: Request, res: Response) => {
  const { params, query } = req;
  log(`[getInvoiceUseCaseAdapter]: get invoice request received, getting invoice by month ${query.month} and year ${query.year}`);
  const filter = { creditCard: { id: params.id }, month: query.month, year: Number(query.year) } as any;
  const invoice = await getInvoiceUsecase(filter, invoicePrismaRepository as any);
  log('[getInvoiceUsecaseAdapter]: invoice found [id] ', invoice);
  return res.status(200).json(invoice);
};

export default getInvoiceUsecaseAdapter;
