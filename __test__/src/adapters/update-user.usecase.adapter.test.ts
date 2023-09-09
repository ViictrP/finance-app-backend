jest.mock('../../../src/core/usecases/update-user.usecase');
import { updateUserUsecase } from '../../../src/core/usecases';
import updateUserUsecaseAdapter from '../../../src/adapters/update-user.usecase.adapter';

describe('updateUserUseCaseAdapter', () => {
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

  it('Should return success after updating the user', async () => {
    const useCase = updateUserUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await updateUserUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/users/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = updateUserUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new Error('Error');
      });
      await updateUserUsecaseAdapter(req as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Error');
    }
  });
});
