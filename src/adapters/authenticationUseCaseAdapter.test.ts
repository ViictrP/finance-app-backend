jest.mock('../auth/usecases/authenticationUseCase');
import authenticationUseCase from '../auth/usecases/authenticationUseCase';
import authenticationUseCaseAdapter from './authenticationUseCaseAdapter';


describe('authenticationUseCaseAdapter', () => {
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

  it('Should return success after deleting the transaction', async () => {
    const useCase = authenticationUseCase as jest.Mock;
    useCase.mockImplementation(() => ({ accessToken: 'accesstoken' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await authenticationUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith({ accessToken: 'accesstoken' });
  });

  it('Should return 422 if an error occurs', async () => {
    const useCase = authenticationUseCase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new Error();
    });
    const statusSpy = jest.spyOn(res, 'status');
    await authenticationUseCaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(422);
  });
});
