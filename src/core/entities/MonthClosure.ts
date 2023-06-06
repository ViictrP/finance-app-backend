import User from './User';

export default interface MonthClosure {
  id: string;
  month: string;
  year: number;
  user: User;
  total: number;
  available: number;
  expenses: number;
  deleted: boolean;
  deleteDate: Date;
  createdAt: Date;
}
