jest.mock('../core/usecases/deleteTransactionUseCase');
import { deleteTransactionUseCase } from '../core/usecases';
import deleteTransactionUseCaseAdapter from './deleteTransactionUseCaseAdapter';


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
    const useCase = deleteTransactionUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    await deleteTransactionUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(204);
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = deleteTransactionUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await deleteTransactionUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
