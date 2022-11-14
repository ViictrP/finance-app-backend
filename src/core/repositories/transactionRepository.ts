import { Transaction, User } from '../entities';

export type TransactionRepository = {
  create: (transaction: Transaction) => Promise<Transaction>;
  createInvoiceTransaction: (transaction: Transaction) => Promise<Transaction>;
  get: (transaction: Transaction) => Promise<Transaction | null>;
  getManyByUserMonthAndYear: (user: User, month: string, year: number) => Promise<Transaction[]>;
  update: (transaction: Transaction) => Promise<Transaction>;
  deleteTransaction: (transaction: Transaction, all: boolean) => Promise<void>;
}
