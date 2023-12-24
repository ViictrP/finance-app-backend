import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import InvoiceRepository from '../core/repositories/invoice.repository';
import getInvoiceUsecase from '../core/usecases/get-invoice.usecase';
import { Invoice } from '@prisma/client';
import invoicePrismaRepository from '../infra/invoice.prisma-repository';

const getInvoiceUsecaseAdapter = async (req: Request, res: Response) => {
  const { params, query } = req;
  log(
    `[getInvoiceUseCaseAdapter]: get invoice request received, getting invoice by month ${query.month} and year ${query.year}`
  );
  const filter: Partial<Invoice> = {
    creditCard: { id: params.id },
    month: query.month as string,
    year: Number(query.year)
  } as Partial<Invoice>;
  //todo remove as any
  const invoice = await getInvoiceUsecase(
    filter as any,
    invoicePrismaRepository as unknown as InvoiceRepository
  );
  log('[getInvoiceUsecaseAdapter]: invoice found [id] ', invoice);
  return res.status(200).json(invoice);
};

export default getInvoiceUsecaseAdapter;
