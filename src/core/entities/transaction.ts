import Invoice from './invoice';
import User from './user';

export default interface Transaction {
  id: string;
  amount: number;
  description: string;
  isInstallment: boolean;
  installmentAmount: number;
  installmentNumber: number;
  installmentId?: string;
  createdAt: Date;
  date: Date;
  invoice?: Invoice;
  user: User;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other';
  deleted: boolean;
  deleteDate?: Date;
}
