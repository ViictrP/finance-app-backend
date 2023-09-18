import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { getInvoiceUsecase } from '../core/usecases';
import { invoicePrismaRepository } from '../infra';
import { InvoiceRepository } from '../core/repositories/invoice.repository';
import { Invoice } from '../core/entities';

const getInvoiceUsecaseAdapter = async (req: Request, res: Response) => {
  const { params, query } = req;
  log(`[getInvoiceUseCaseAdapter]: get invoice request received, getting invoice by month ${query.month} and year ${query.year}`);
  const filter = { creditCard: { id: params.id }, month: query.month, year: Number(query.year) } as Partial<Invoice>;
  const invoice = await getInvoiceUsecase(filter as Invoice, invoicePrismaRepository as unknown as InvoiceRepository);
  log('[getInvoiceUsecaseAdapter]: invoice found [id] ', invoice);
  return res.status(200).json(invoice);
};

export default getInvoiceUsecaseAdapter;
