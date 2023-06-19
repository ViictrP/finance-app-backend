import Transaction from './transaction';
import CreditCard from './credit-card';
import RecurringExpense from './recurring-expense';
import MonthClosure from './month-closure';

export default interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  salary?: number;
  creditCards: CreditCard[];
  transactions: Transaction[];
  recurringExpenses: RecurringExpense[];
  monthClosures: MonthClosure[];
  delete: boolean;
  deleteDate?: Date;
}
