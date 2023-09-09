import { CreditCard, RecurringExpense, Transaction, User } from '../entities';
import { UserRepository } from '../repositories';
import { log } from '../logger/logger';
import { RequestError } from '../errors/request.error';

type TransactionFilter = {
  user: User;
  month: string;
  year: number;
}

type CreditCardsTotal = { [key: string]: number };

type Balance = {
  salary: number;
  expenses: number;
  available: number;
  creditCardExpenses: CreditCardsTotal;
  transactions: Transaction[];
  recurringExpenses: RecurringExpense[];
  creditCards: CreditCard[];
};

const getBalanceUsecase = async (filter: TransactionFilter, repository: UserRepository): Promise<Balance> => {
  log('[getBalanceUsecase]: validating filter');
  if (!filter.user) {
    throw new RequestError('user is required to calculate the balance');
  }
  const { user, month, year } = filter;
  log(`[getBalanceUseCase]: getting the transactions of ${month}/${year}`);
  const { creditCards, transactions, recurringExpenses, salary } = await repository.get(user, month, year) as User;

  const transactionsAmount = transactions.reduce((sum, current) => doSum(sum, current.amount), 0);
  const recurringExpensesAmount = recurringExpenses.reduce((sum, current) => doSum(sum, current.amount), 0);

  const creditCardExpenses: CreditCardsTotal = {};
  const creditCardsAmount = creditCards.reduce((sum, current) => {
    const invoice = current.invoices[0];
    const amount = !!invoice ? invoice.transactions.reduce((sum, current) => {
      return sum + Number(current.amount);
    }, 0) : 0;
    const creditCardSum = sum + Number(amount);
    creditCardExpenses[current.id] = amount;
    return creditCardSum;
  }, 0);

  const expenses = transactionsAmount + recurringExpensesAmount + creditCardsAmount;
  return {
    salary: Number(salary),
    expenses,
    available: Number(salary) - expenses,
    creditCardExpenses,
    creditCards,
    transactions,
    recurringExpenses
  } as Balance;
};

const doSum = (sum: number, current: number | string): number => sum + Number(current);

export default getBalanceUsecase;
