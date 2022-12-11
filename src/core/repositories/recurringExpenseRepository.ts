import RecurringExpense from '../entities/RecurringExpense';

export type RecurringExpenseRepository = {
  create: (recurringExpense: RecurringExpense) => Promise<RecurringExpense>;
};
