import User from './user';
import Invoice from './invoice';

export default interface CreditCard {
  id: string;
  title: string;
  description: string;
  number: string;
  user: User;
  invoices: Invoice[];
  invoiceClosingDay: number;
  createAt: Date;
  backgroundColor: string;
  deleted: boolean;
  deleteDate?: Date;
}
