import { CreditCard, User } from '../entities';

export type CreditCardRepository = {
  create: (creditCard: CreditCard) => Promise<CreditCard>;
  getMany: (user: User) => Promise<CreditCard[]>;
  get: (creditCard: CreditCard) => Promise<CreditCard>;
  update: (creditCard: CreditCard) => Promise<CreditCard>;
};
