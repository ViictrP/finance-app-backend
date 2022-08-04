jest.mock('../core/usecases/getUserUseCase');
import getMyProfileUseCaseAdapter from './getMyProfileUseCaseAdapter';
import { getUserUseCase } from '../core/usecases';

describe('getMyProfileUseCaseAdapter', () => {

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

  it('Should return User data if user has profile', async () => {
    const useCase = getUserUseCase as jest.Mock;
    useCase.mockImplementation(() => ({id: 'test'}));
    const jsonSpy = jest.spyOn(res, 'json');
    await getMyProfileUseCaseAdapter({} as any, res as any);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = getUserUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await getMyProfileUseCaseAdapter({} as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
