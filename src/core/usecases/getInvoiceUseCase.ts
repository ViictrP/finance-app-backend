import { InvoiceRepository } from '../repositories/invoiceRepository';
import { Invoice } from '../entities';
import { log } from '../logger/logger';

const getInvoiceUseCase = async (invoice: Invoice, repository: InvoiceRepository) => {
  log('[getInvoiceUseCase]: getting invoice by filter', invoice);
  return repository.get(invoice);
};
export default getInvoiceUseCase;
