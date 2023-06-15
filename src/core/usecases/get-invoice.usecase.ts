import { InvoiceRepository } from '../repositories/invoice.repository';
import { Invoice } from '../entities';
import { log } from '../logger/logger';

const getInvoiceUsecase = async (invoice: Invoice, repository: InvoiceRepository) => {
  log('[getInvoiceUsecase]: getting invoice by filter', invoice);
  return repository.get(invoice);
};
export default getInvoiceUsecase;
