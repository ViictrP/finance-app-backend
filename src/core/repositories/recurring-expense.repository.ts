import RecurringExpense from '../entities/recurring-expense';

export default interface RecurringExpenseRepository {
  get: (id: string) => Promise<RecurringExpense>;
  create: (recurringExpense: RecurringExpense) => Promise<RecurringExpense>;
  deleteOne: (recurringExpense: RecurringExpense) => Promise<RecurringExpense>;
}
