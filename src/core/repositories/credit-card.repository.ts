import CreditCard from '../entities/credit-card';
import User from '../entities/user';

export default interface CreditCardRepository {
  create: (creditCard: CreditCard) => Promise<CreditCard>;
  getMany: (user: User) => Promise<CreditCard[]>;
  get: (creditCard: CreditCard, deleted: boolean) => Promise<CreditCard>;
  update: (creditCard: CreditCard) => Promise<CreditCard>;
  deleteOne: (creditCard: CreditCard) => Promise<CreditCard>;
}
