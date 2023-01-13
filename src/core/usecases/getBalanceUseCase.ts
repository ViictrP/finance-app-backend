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
  const { creditCards, transactions, recurringExpenses } = await repository.get(user, month, year) as User;
  return {
    creditCards: creditCards,
    transactions: transactions,
    recurringExpenses: recurringExpenses
  }
};

export default getBalanceUseCase;
