import { log } from '../logger/logger';
import User from '../entities/user';
import CreditCardRepository from '../repositories/credit-card.repository';
import CreditCard from '../entities/credit-card';

const getCreditCardsUsecase = async (
  user: User,
  repository: CreditCardRepository
): Promise<CreditCard[]> => {
  log(`[getCreditCardsUseCase]: getting credit cards by user: ${user}`);
  return repository.getMany(user);
};

export default getCreditCardsUsecase;
