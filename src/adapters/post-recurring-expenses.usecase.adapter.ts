import { Response, Request } from 'express';
import { log } from '../core/logger/logger';
import createRecurringExpensesUsecase from '../core/usecases/create-recurring-expenses.usecase';
import recurringExpensePrismaRepository from '../infra/recurring-expense.prisma-repository';
import RecurringExpenseRepository from '../core/repositories/recurring-expense.repository';
import userPrismaRepository from '../infra/user.prisma-repository';
import UserRepository from '../core/repositories/user.repository';

const postRecurringExpensesUsecaseAdapter = async (
  req: Request,
  res: Response
) => {
  const { user } = res.locals;
  const { body: data } = req;
  data.user = user;
  log(
    `[createRecurringExpensesUseCaseAdapter]: creating recurring expense ${data.description}`
  );
  const recurringExpense = await createRecurringExpensesUsecase(
    data,
    recurringExpensePrismaRepository as unknown as RecurringExpenseRepository,
    userPrismaRepository as unknown as UserRepository
  );
  log(
    `[createRecurringExpensesUseCaseAdapter]: recurring expense ${recurringExpense.description} created`
  );
  return res.status(201).json(recurringExpense);
};

export default postRecurringExpensesUsecaseAdapter;
