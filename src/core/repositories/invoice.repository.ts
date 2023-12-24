import Invoice from '../entities/invoice';

export default interface InvoiceRepository {
  get(invoice: Invoice): Promise<Invoice>;
}
