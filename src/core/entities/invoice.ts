import CreditCard from './credit-card';
import Transaction from './transaction';

export default interface Invoice {
  id: string;
  month: string;
  year: number;
  isClosed: boolean;
  creditCard: CreditCard;
  transactions: Transaction[];
  createdAt: Date;
}
