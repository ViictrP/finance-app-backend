import { RecurringExpense } from '../../../src/core/entities';
import User from '../../../src/core/entities/user';
import { createRecurringExpensesUsecase } from '../../../src/core/usecases';
import { postRecurringExpensesUsecaseAdapter } from '../../../src/adapters';
import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/core/usecases/create-recurring-expenses.usecase');
describe('createRecurringExpenseUseCaseAdapter', () => {
  const res = {
    locals: {
      user: {
        id: 'test',
      },
    },
    json: function(err: any) {
      return err;
    },
    status: function() {
      return this;
    },
  };
  const req = {
    body: {
      description: 'TEST',
    },
  };

  it('Should create recurring expense with success', async () => {
    const data: RecurringExpense = {
      id: 'TEST',
      description: 'TEST',
      amount: 1000,
      createdAt: new Date(),
      user: { id: 'TEST' } as User,
      category: 'OTHER',
      deleted: false,
      deleteDate: null
    };
    const useCase = createRecurringExpensesUsecase as jest.Mock;
    useCase.mockImplementation(() => (data));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await postRecurringExpensesUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith(data);
  });

  it('Should return error if recurring expense is invalid', async () => {
    try {
      const useCase = createRecurringExpensesUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Error');
      });
      await postRecurringExpensesUsecaseAdapter({ body: {} } as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Error');
    }
  });
});
