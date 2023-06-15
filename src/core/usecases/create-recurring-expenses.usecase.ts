import RecurringExpense from '../entities/recurring-expense';
import { UserRepository } from '../repositories';
import { RecurringExpenseRepository } from '../repositories/recurring-expense.repository';
import { log } from '../logger/logger';
import { User } from '../entities';
import { recurringExpenseValidator } from '../validators';

const createRecurringExpensesUsecase = async (
  recurringExpense: RecurringExpense,
  repository: RecurringExpenseRepository,
  userRepository: UserRepository) => {
  log(`[createRecurringExpensesUseCase]: validating expense data ${recurringExpense}`);
  const isValid = recurringExpenseValidator(recurringExpense);
  if (!isValid) {
    log(`[createRecurringExpensesUseCase]: recurring expense has invalid data`);
    throw new Error(`The recurring expense ${recurringExpense.description} has invalid data`);
  }

  const user = await userRepository.get(recurringExpense.user);
  recurringExpense.user = { id: user!.id } as User;
  log(`[createRecurringExpensesUseCase]: creating the recurring expense ${recurringExpense.description}`);
  return repository.create({
    description: recurringExpense.description,
    user: recurringExpense.user,
    amount: recurringExpense.amount,
    category: recurringExpense.category
  } as RecurringExpense);
};

export default createRecurringExpensesUsecase;
