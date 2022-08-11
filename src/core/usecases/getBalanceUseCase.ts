import { User } from '../entities';
import { UserRepository } from '../repositories';
import { log } from '../logger/logger';

type TransactionFilter = {
  user: User;
  month: string;
  year: number;
}

const getBalanceUseCase = async (filter: TransactionFilter, repository: UserRepository) => {
  log('[getBalanceUseCase]: validating filter');
  if (!filter.user) {
    throw new Error('user is required to calculate the balance');
  }
  const { user, month, year } = filter;
  log(`[getBalanceUseCase]: getting the transactions of ${month}/${year}`);
  const profile = await repository.get(user, month, year);
  return {
    creditCards: profile!.creditCards,
    transactions: profile!.transactions,
  }
};

export default getBalanceUseCase;
