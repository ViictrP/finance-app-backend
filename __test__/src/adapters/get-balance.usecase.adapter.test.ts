import { getBalanceUsecase } from '../../../src/core/usecases';
import { getBalanceUsecaseAdapter } from '../../../src/adapters';

jest.mock('../../../src/core/usecases/get-balance.usecase');

describe('getBalanceUseCaseAdapter', () => {
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
    query: { month: 'jun', year: 2022 }
  };

  it('Should return the balance', async () => {
    const useCase = getBalanceUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ creditCards: [], transactions: [] }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await getBalanceUsecaseAdapter(req as any, res as any);

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ creditCards: [], transactions: [] });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = getBalanceUsecase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await getBalanceUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
