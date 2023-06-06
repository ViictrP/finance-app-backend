import RecurringExpense from '../entities/RecurringExpense';

export type RecurringExpenseRepository = {
  get: (id: string) => Promise<RecurringExpense>;
  create: (recurringExpense: RecurringExpense) => Promise<RecurringExpense>;
  deleteOne: (recurringExpense: RecurringExpense) => Promise<RecurringExpense>;
};
