jest.mock('../core/usecases', () => ({
  getUserUseCase: () => ({ id: 'test' })
}));
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
    const jsonSpy = jest.spyOn(res, 'json');
    await getMyProfileUseCaseAdapter({} as any, res as any);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test' });
  });

  //TODO need to fix this test

  // it('Should return 422 if an error occurs', async () => {
  //   const statusSpy = jest.spyOn(res, 'status');
  //   await getMyProfileUseCaseAdapter({} as any, res as any);
  //   expect(statusSpy).toHaveBeenCalledWith(422);
  // });
});
