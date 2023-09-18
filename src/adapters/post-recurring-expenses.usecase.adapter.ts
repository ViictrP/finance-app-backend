import { Response, Request } from 'express';
import { log } from '../core/logger/logger';
import { createRecurringExpensesUsecase } from '../core/usecases';
import { recurringExpensePrismaRepository, userPrismaRepository } from '../infra';
import { RecurringExpenseRepository, UserRepository } from '../core/repositories';

const postRecurringExpensesUsecaseAdapter = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { body: data } = req;
  data.user = user;
  log(`[createRecurringExpensesUseCaseAdapter]: creating recurring expense ${data.description}`);
  const recurringExpense = await createRecurringExpensesUsecase(data, recurringExpensePrismaRepository as unknown as RecurringExpenseRepository, userPrismaRepository as unknown as UserRepository);
  log(`[createRecurringExpensesUseCaseAdapter]: recurring expense ${recurringExpense.description} created`);
  return res.status(201).json(recurringExpense);
};

export default postRecurringExpensesUsecaseAdapter;
