import { RecurringExpense } from '../../../src/core/entities';
import User from '../../../src/core/entities/User';
import { createRecurringExpensesUseCase } from '../../../src/core/usecases';
import { postRecurringExpensesUseCaseAdapter } from '../../../src/adapters';

jest.mock('../../../src/core/usecases/createRecurringExpensesUseCase');
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
    };
    const useCase = createRecurringExpensesUseCase as jest.Mock;
    useCase.mockImplementation(() => (data));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await postRecurringExpensesUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith(data);
  });

  it('Should return error if recurring expense is invalid', async () => {
    const statusSpy = jest.spyOn(res, 'status');
    const useCase = createRecurringExpensesUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error('Error');
    });
    await postRecurringExpensesUseCaseAdapter({ body: {} } as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
