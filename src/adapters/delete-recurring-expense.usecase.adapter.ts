import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import deleteRecurringExpenseUsecase from '../core/usecases/delete-recurring-expense.usecase';
import recurringExpensePrismaRepository from '../infra/recurring-expense.prisma-repository';
import RecurringExpenseRepository from '../core/repositories/recurring-expense.repository';

const deleteRecurringExpenseUsecaseAdapter = async (
  req: Request,
  res: Response
) => {
  const { params } = req;
  const recurringExpenseId = params.id;
  log(
    `[deleteRecurringExpenseUseCaseAdapter]: deleting recurring expense ${recurringExpenseId}`
  );
  await deleteRecurringExpenseUsecase(
    recurringExpenseId,
    recurringExpensePrismaRepository as unknown as RecurringExpenseRepository
  );
  log(`[deleteRecurringExpenseUseCaseAdapter]: recurring expense deleted`);
  return res.status(204).json();
};

export default deleteRecurringExpenseUsecaseAdapter;
