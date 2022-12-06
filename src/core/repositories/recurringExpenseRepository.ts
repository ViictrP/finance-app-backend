import RecurringExpense from '../entities/RecurringExpense';

export type RecurringExpenseRepository = {
  create: (RecurringExpense: RecurringExpense) => Promise<RecurringExpense>;
};
