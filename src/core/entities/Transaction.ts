import Invoice from './Invoice';
import User from './User';

export default interface Transaction {
  id: string;
  amount: number;
  description: string;
  isInstallment: boolean;
  installmentAmount?: number;
  createdAt: Date;
  date: Date;
  invoice?: Invoice;
  user: User;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other'
}
