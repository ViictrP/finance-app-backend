import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/core/usecases/get-invoice.usecase');
import { getInvoiceUsecase } from '../../../src/core/usecases';
import getInvoiceUsecaseAdapter from '../../../src/adapters/get-invoice.usecase.adapter';

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
    const useCase = getInvoiceUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await getInvoiceUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 404 if an error occurs', async () => {
    try {
      const useCase = getInvoiceUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Error');
      });
      await getInvoiceUsecaseAdapter(req as any, res as any);
    } catch(error) {
      expect(error.message).toEqual('Error');
    }
  });
});
