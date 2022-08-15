jest.mock('../../../src/core/usecases/createCreditCardUseCase');
import postCreditCardUseCaseAdapter from '../../../src/adapters/postCreditCardUseCaseAdapter';
import { createCreditCardUseCase } from '../../../src/core/usecases';

describe('postCreditCardUseCaseAdapter', () => {
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
    const useCase = createCreditCardUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const jsonSpy = jest.spyOn(res, 'json');
    await postCreditCardUseCaseAdapter(req as any, res as any);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/credit-cards/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = createCreditCardUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await postCreditCardUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
