import { Response, Request } from 'express';
import { log } from '../core/logger/logger';
import { createRecurringExpensesUsecase } from '../core/usecases';
import { recurringExpensePrismaRepository, userPrismaRepository } from '../infra';

const postRecurringExpensesUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { body: data } = req;
    data.user = user;
    log(`[createRecurringExpensesUseCaseAdapter]: creating recurring expense ${data.description}`);
    const recurringExpense = await createRecurringExpensesUsecase(data, recurringExpensePrismaRepository as any, userPrismaRepository as any);
    log(`[createRecurringExpensesUseCaseAdapter]: recurring expense ${recurringExpense.description} created`);
    res.status(201).json(recurringExpense);
  } catch (error: any) {
    log(`[createRecurringExpensesUseCaseAdapter]: an error occured while creating the recurring expense [${error}]`);
    res.status(422).json({ error: error.message });
  }
};

export default postRecurringExpensesUsecaseAdapter;
