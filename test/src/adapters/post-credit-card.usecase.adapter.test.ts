import ValidationError from '../../../src/core/errors/validation.error';

jest.mock('../../../src/core/usecases/create-credit-card.usecase');
import postCreditCardUsecaseAdapter from '../../../src/adapters/post-credit-card.usecase.adapter';
import createCreditCardUseCase from '../../../src/core/usecases/create-credit-card.usecase';

describe('postCreditCardUseCaseAdapter', () => {
  const res = {
    locals: {
      user: {
        id: 'test'
      }
    },
    json: function (err: any) {
      return err;
    },
    status: function () {
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
    await postCreditCardUsecaseAdapter(req as any, res as any);
    expect(jsonSpy).toHaveBeenCalledWith({
      id: 'test',
      path: '/credit-cards/test'
    });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = createCreditCardUseCase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Error');
      });
      await postCreditCardUsecaseAdapter(req as any, res as any);
    } catch (error: any) {
      expect(error.message).toEqual('Error');
    }
  });
});
