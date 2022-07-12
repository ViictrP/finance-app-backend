import { CreditCard, User } from '../entities';

export type CreditCardRepository = {
  create: (creditCard: CreditCard) => Promise<CreditCard>;
  getMany: (user: User) => Promise<CreditCard[]>;
  update: (creditCard: CreditCard) => Promise<CreditCard>;
};
