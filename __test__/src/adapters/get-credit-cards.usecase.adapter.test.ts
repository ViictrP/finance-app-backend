import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/core/usecases/get-credit-cards.usecase');
import { getCreditCardsUsecase } from '../../../src/core/usecases';
import getCreditCardsUsecaseAdapter from '../../../src/adapters/get-credit-cards.usecase.adapter';

describe('getCreditCardsUseCaseAdapter', () => {
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

  it('Should return success after getting credit cards', async () => {
    const useCase = getCreditCardsUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await getCreditCardsUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = getCreditCardsUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Invalid');
      });
      await getCreditCardsUsecaseAdapter(req as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Invalid');
    }
  });
});
