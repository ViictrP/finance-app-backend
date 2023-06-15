import { Invoice } from '../entities';

export type InvoiceRepository = {
  get(invoice: Invoice): Promise<Invoice>;
}
