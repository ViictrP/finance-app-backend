import { Invoice, Transaction } from '../entities';

export type TransactionRepository = {
  create: (transaction: Transaction) => Promise<Transaction>;
  createInvoiceTransaction: (transaction: Transaction) => Promise<Transaction>;
  get: (transaction: Transaction) => Promise<Transaction | null>;
  update: (transaction: Transaction) => Promise<Transaction>;
}