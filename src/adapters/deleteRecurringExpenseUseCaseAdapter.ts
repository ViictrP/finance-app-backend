import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { recurringExpensePrismaRepository } from '../infra';
import { deleteRecurringExpenseUseCase } from '../core/usecases';

const deleteRecurringExpenseUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const recurringExpenseId = params.id;
    log(`[deleteRecurringExpenseUseCaseAdapter]: deleting recurring expense ${recurringExpenseId}`);
    await deleteRecurringExpenseUseCase(recurringExpenseId, recurringExpensePrismaRepository as any);
    log(`[deleteRecurringExpenseUseCaseAdapter]: recurring expense deleted`);
    return res.status(204).json();
  } catch (error) {
    log(`[deleteRecurringExpenseUseCaseAdapter]: an error occured while deleting the recurring expense [${error}]`);
    return res.status(422).json({ error });
  }
};

export default deleteRecurringExpenseUseCaseAdapter;
