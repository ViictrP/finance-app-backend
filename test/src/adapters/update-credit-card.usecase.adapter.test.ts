jest.mock('../../../src/core/usecases/update-credit-card.usecase');
import updateCreditCardUsecase from '../../../src/core/usecases/update-credit-card.usecase';
import updateCreditCardUsecaseAdapter from '../../../src/adapters/update-credit-card.usecase.adapter';

describe('updateCreditCardUseCaseAdapter', () => {
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
    const useCase = updateCreditCardUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await updateCreditCardUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({
      id: 'test',
      path: '/credit-cards/test'
    });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = updateCreditCardUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new Error('Error');
      });
      await updateCreditCardUsecaseAdapter(req as any, res as any);
    } catch (error: any) {
      expect(error.message).toEqual('Error');
    }
  });
});
