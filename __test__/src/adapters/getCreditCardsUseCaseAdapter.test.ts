jest.mock('../../../src/core/usecases/getCreditCardsUseCase');
import { getCreditCardsUseCase } from '../../../src/core/usecases';
import getCreditCardsUseCaseAdapter from '../../../src/adapters/getCreditCardsUseCaseAdapter';

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
    const useCase = getCreditCardsUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await getCreditCardsUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = getCreditCardsUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await getCreditCardsUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
