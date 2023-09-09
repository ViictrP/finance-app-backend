import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { recurringExpensePrismaRepository } from '../infra';
import { deleteRecurringExpenseUsecase } from '../core/usecases';

const deleteRecurringExpenseUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;
  const recurringExpenseId = params.id;
  log(`[deleteRecurringExpenseUseCaseAdapter]: deleting recurring expense ${recurringExpenseId}`);
  await deleteRecurringExpenseUsecase(recurringExpenseId, recurringExpensePrismaRepository as any);
  log(`[deleteRecurringExpenseUseCaseAdapter]: recurring expense deleted`);
  return res.status(204).json();
};

export default deleteRecurringExpenseUsecaseAdapter;
