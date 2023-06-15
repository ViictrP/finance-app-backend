jest.mock('../../../src/core/usecases/create-user.usecase');
import { createUserUsecase } from '../../../src/core/usecases';
import postUserUsecaseAdapter from '../../../src/adapters/post-user.usecase.adapter';

describe('postUserUseCaseAdapter', () => {
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

  it('Should return success after saving new user', async () => {
    const useCase = createUserUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await postUserUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/users/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = createUserUsecase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await postUserUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
