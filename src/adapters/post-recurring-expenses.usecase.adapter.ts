import { Response, Request } from 'express';
import { log } from '../core/logger/logger';
import createRecurringExpensesUsecase from '../core/usecases/create-recurring-expenses.usecase';
import recurringExpensePrismaRepository from '../infra/recurring-expense.prisma-repository';
import RecurringExpenseRepository from '../core/repositories/recurring-expense.repository';
import RecurringExpense from '../core/entities/recurring-expense';
import { RequestWithProfile } from './middlewares/profile.middleware';

const postRecurringExpensesUsecaseAdapter = async (
  req: Request,
  res: Response
) => {
  const { body: data } = req;

  const recurringExpense: Partial<RecurringExpense> = {
    description: data.description,
    amount: data.amount,
    user: (req as RequestWithProfile).profile,
    category: data.category
  };

  log(`[createRecurringExpensesUseCaseAdapter]: creating recurring expense ${data.description}`);
  const newRecurringExpense = await createRecurringExpensesUsecase(
    recurringExpense as RecurringExpense,
    recurringExpensePrismaRepository as unknown as RecurringExpenseRepository
  );
  log(`[createRecurringExpensesUseCaseAdapter]: recurring expense ${newRecurringExpense.description} created`);
  return res.status(201).json(newRecurringExpense);
};

export default postRecurringExpensesUsecaseAdapter;
