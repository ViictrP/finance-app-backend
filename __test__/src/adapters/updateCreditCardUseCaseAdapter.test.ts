jest.mock('../../../src/core/usecases/updateCreditCardUseCase');
import { updateCreditCardUseCase } from '../../../src/core/usecases';
import updateCreditCardUseCaseAdapter from '../../../src/adapters/updateCreditCardUseCaseAdapter';

describe('updateCreditCardUseCaseAdapter', () => {
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

  it('Should return success after updating the credit card', async () => {
    const useCase = updateCreditCardUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await updateCreditCardUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/credit-cards/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = updateCreditCardUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await updateCreditCardUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
