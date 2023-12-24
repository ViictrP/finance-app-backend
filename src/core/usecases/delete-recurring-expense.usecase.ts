import { log } from '../logger/logger';
import RecurringExpenseRepository from '../repositories/recurring-expense.repository';
import RequestError from '../errors/request.error';

const deleteRecurringExpenseUsecase = async (
  id: string,
  repository: RecurringExpenseRepository
) => {
  log(
    `[deleteRecurringExpenseUseCase]: getting recurring expense information id `,
    id
  );
  const recurringExpense = await repository.get(id);

  if (!recurringExpense) {
    throw new RequestError(`recurring expense not found for id ${id}`);
  }

  log(
    `[deleteRecurringExpenseUseCase]: deleting recurring expense information id `,
    id
  );
  return repository.deleteOne(recurringExpense);
};

export default deleteRecurringExpenseUsecase;
