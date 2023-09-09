import { RecurringExpenseRepository } from '../repositories';
import { log } from '../logger/logger';
import { RequestError } from '../errors/request.error';

const deleteRecurringExpenseUsecase = async (id: string, repository: RecurringExpenseRepository) => {
  log(`[deleteRecurringExpenseUseCase]: getting recurring expense information id `, id);
  const recurringExpense = await repository.get({ id } as any);

  if (!recurringExpense) {
    log(`[deleteRecurringExpenseUseCase]: getting recurring expense information id `, id);
    throw new RequestError(`recurring expense not found for id ${id}`);
  }

  log(`[deleteRecurringExpenseUseCase]: deletting recurring expense information id `, id);
  return repository.deleteOne(recurringExpense);
};

export default deleteRecurringExpenseUsecase;
