import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/core/usecases/create-transaction.usecase');
import { createTransactionUsecase } from '../../../src/core/usecases';
import postTransactionUsecaseAdapter from '../../../src/adapters/post-transaction.usecase.adapter';

describe('postTransactionUseCase', () => {
  const res = {
    locals: {
      user: {
        id: 'test'
      }
    },
    json: function(err: any) {
      return err;
    },
    status: function() {
      return this;
    }
  };
  const req = {
    body: {},
    params: { id: 'test' }
  };

  it('Should return success after saving the transaction card', async () => {
    const useCase = createTransactionUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await postTransactionUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/transactions/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = createTransactionUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Error');
      });
      await postTransactionUsecaseAdapter(req as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Error');
    }
  });
});
