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
    const useCase = createTransactionUsecase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await postTransactionUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
