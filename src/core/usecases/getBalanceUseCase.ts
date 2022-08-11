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
  log(`[getBalanceUseCase]: calculating the balance`);
  const debitAmount = profile!.transactions.reduce((sum, current) => sum + Number(current.amount), 0);
  const creditCardsAmount = profile!.creditCards.reduce((sum, current) => {
    const transactions = current.invoices
      .map(invoice => invoice.transactions)
      .reduce((sum, current) => sum.concat(current), []);
    const amount = transactions.reduce((sum, current) => {
      return sum + Number(current.amount);
    }, 0);
    return sum + Number(amount);
  }, 0);

  const expensesAmount = debitAmount + creditCardsAmount;
  const balanceAmount = Number(profile!.salary) - expensesAmount;
  return {
    expensesTotalAmount: expensesAmount,
    availableAmount: balanceAmount,
  }
};

export default getBalanceUseCase;
