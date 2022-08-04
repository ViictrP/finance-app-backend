jest.mock('../core/usecases/getInvoiceUseCase');
import { getInvoiceUseCase } from '../core/usecases';
import getInvoiceUseCaseAdapter from './getInvoiceUseCaseAdapter';

describe('getInvoiceUseCaseAdapter', () => {
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
    params: { id: 'test' },
    query: { month: 'JUL', year: 2022}
  };

  it('Should return success after getting the invoice by month and year', async () => {
    const useCase = getInvoiceUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await getInvoiceUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 404 if an error occurs', async () => {
    const useCase = getInvoiceUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await getInvoiceUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(404);
  });
});
