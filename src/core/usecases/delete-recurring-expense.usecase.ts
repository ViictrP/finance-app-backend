import { RecurringExpenseRepository } from '../repositories';
import { log } from '../logger/logger';
import {RequestError} from "../errors";

const deleteRecurringExpenseUsecase = async (id: string, repository: RecurringExpenseRepository) => {
  log(`[deleteRecurringExpenseUseCase]: getting recurring expense information id `, id);
  const recurringExpense = await repository.get(id);

  if (!recurringExpense) {
    throw new RequestError(`recurring expense not found for id ${id}`);
  }

  log(`[deleteRecurringExpenseUseCase]: deleting recurring expense information id `, id);
  return repository.deleteOne(recurringExpense);
};

export default deleteRecurringExpenseUsecase;
