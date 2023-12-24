import InvoiceRepository from '../repositories/invoice.repository';
import { log } from '../logger/logger';
import Invoice from '../entities/invoice';

const getInvoiceUsecase = async (
  invoice: Invoice,
  repository: InvoiceRepository
) => {
  log('[getInvoiceUsecase]: getting invoice by filter', invoice);
  return repository.get(invoice);
};
export default getInvoiceUsecase;
