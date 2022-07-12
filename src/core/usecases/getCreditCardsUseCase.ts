import { log } from '../logger/logger';
import User from '../entities/User';
import { CreditCardRepository } from '../repositories';
import { CreditCard } from '../entities';

const getCreditCardsUseCase = async (user: User, repository: CreditCardRepository): Promise<CreditCard[]> => {
  log(`[getCreditCardsUseCase]: getting credit cards by user: ${user}`);
  return repository.getMany(user);
};

export default getCreditCardsUseCase;
