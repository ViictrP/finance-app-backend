import User from './User';

export default interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  createdAt: Date;
  user: User;
  category: string;
  deleted: boolean;
  deleteDate?: Date;
}
