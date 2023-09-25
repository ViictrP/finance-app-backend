import { CreditCard, RecurringExpense, Transaction, User } from '../entities';
import { UserRepository } from '../repositories';
import { log } from '../logger/logger';
import {NotFoundError, RequestError} from "../errors";

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
  validateFilter(filter);
  log(`[getBalanceUseCase]: getting the transactions of ${filter.month}/${filter.year}`);
  const user = await repository.get(filter.user, filter.month, filter.year) as User;

  if (!user) {
    log(`[getBalanceUseCase]: user not found for the filter ${filter.user}`);
    throw new NotFoundError(`user not found for the filter ${filter.user}`);
  }

  const salaryNumber = +user.salary!;

  const transactionsAmount = user.transactions.reduce((sum, current) => sum + Number(current.amount), 0);
  const recurringExpensesAmount = user.recurringExpenses.reduce((sum, current) => sum + Number(current.amount), 0);

  const creditCardExpenses: CreditCardsTotal = {};
  let creditCardsAmount = 0;
  for (const current of user.creditCards) {
    const invoice = current.invoices[0];
    const amount = !!invoice ? invoice.transactions.reduce((sum, current) => {
      return sum + +current.amount;
    }, 0) : 0;
    const creditCardSum = creditCardsAmount + +amount;
    creditCardExpenses[current.id] = +amount;
    creditCardsAmount = creditCardSum;
  }

  const expenses = transactionsAmount + recurringExpensesAmount + creditCardsAmount;
  return {
    salary: salaryNumber,
    expenses,
    available: salaryNumber - expenses,
    creditCardExpenses,
    creditCards: user.creditCards,
    transactions: user.transactions,
    recurringExpenses: user.recurringExpenses
  } as Balance;
};

const validateFilter = (filter: TransactionFilter) => {
  if (!filter.user) {
    throw new RequestError('user is required to calculate the balance');
  }
};

export default getBalanceUsecase;
