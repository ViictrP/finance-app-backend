import RecurringExpense from '../entities/recurring-expense';
import { log } from '../logger/logger';
import RecurringExpenseRepository from '../repositories/recurring-expense.repository';
import UserRepository from '../repositories/user.repository';
import ValidationError from '../errors/validation.error';
import User from '../entities/user';
import recurringExpenseValidator from '../validators/recurring-expense.validator';

const createRecurringExpensesUsecase = async (
  recurringExpense: RecurringExpense,
  repository: RecurringExpenseRepository,
  userRepository: UserRepository
) => {
  log(
    `[createRecurringExpensesUseCase]: validating expense data ${recurringExpense}`
  );
  const isValid = recurringExpenseValidator(recurringExpense);
  if (!isValid) {
    log(`[createRecurringExpensesUseCase]: recurring expense has invalid data`);
    throw new ValidationError(
      `The recurring expense ${recurringExpense.description} has invalid data`
    );
  }

  const user = await userRepository.get(recurringExpense.user);
  recurringExpense.user = { id: user!.id } as User;
  log(
    `[createRecurringExpensesUseCase]: creating the recurring expense ${recurringExpense.description}`
  );
  return repository.create({
    description: recurringExpense.description,
    user: recurringExpense.user,
    amount: recurringExpense.amount,
    category: recurringExpense.category
  } as RecurringExpense);
};

export default createRecurringExpensesUsecase;
