import { CreditCard, User } from '../entities';

export type CreditCardRepository = {
  create: (creditCard: CreditCard) => Promise<CreditCard>;
  getMany: (user: User) => Promise<CreditCard[]>;
  get: (creditCard: CreditCard, deleted: boolean) => Promise<CreditCard>;
  update: (creditCard: CreditCard) => Promise<CreditCard>;
  deleteOne: (creditCard: CreditCard) => Promise<CreditCard>;
};
