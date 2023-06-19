jest.mock('../../../src/core/usecases/get-user.usecase');
import getMyProfileUsecaseAdapter from '../../../src/adapters/get-my-profile.usecase.adapter';
import { getUserUsecase } from '../../../src/core/usecases';

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

  it('Should return UserDto data if user has profile', async () => {
    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => ({id: 'test'}));
    const jsonSpy = jest.spyOn(res, 'json');
    await getMyProfileUsecaseAdapter({} as any, res as any);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await getMyProfileUsecaseAdapter({} as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});