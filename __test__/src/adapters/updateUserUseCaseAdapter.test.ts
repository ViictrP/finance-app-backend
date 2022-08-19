jest.mock('../../../src/core/usecases/updateUserUseCase');
import { updateUserUseCase } from '../../../src/core/usecases';
import updateUserUseCaseAdapter from '../../../src/adapters/updateUserUseCaseAdapter';

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
    const useCase = updateUserUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ id: 'test' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await updateUserUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith({ id: 'test', path: '/users/test' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = updateUserUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await updateUserUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
