import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/core/usecases/delete-transaction.usecase');
import { deleteTransactionUsecase } from '../../../src/core/usecases';
import deleteTransactionUsecaseAdapter from '../../../src/adapters/delete-transaction.usecase.adapter';


describe('deleteTransactionUseCaseAdapter', () => {
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

  it('Should return success after deleting the transaction', async () => {
    const useCase = deleteTransactionUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const _req = { ...req, query: { all: false } };
    await deleteTransactionUsecaseAdapter(_req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(204);
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = deleteTransactionUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Invalid transaction');
      });
      await deleteTransactionUsecaseAdapter(req as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Invalid transaction');
    }
  });
});
