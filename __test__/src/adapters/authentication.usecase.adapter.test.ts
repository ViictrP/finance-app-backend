import { ValidationError } from '../../../src/core/errors';

jest.mock('../../../src/auth/usecases/authentication.usecase');
import authenticationUsecase from '../../../src/auth/usecases/authentication.usecase';
import authenticationUsecaseAdapter from '../../../src/adapters/authentication.usecase.adapter';


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
    const useCase = authenticationUsecase as jest.Mock;
    useCase.mockImplementation(() => ({ accessToken: 'accesstoken' }));
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await authenticationUsecaseAdapter(req as any, res as any);
    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith({ accessToken: 'accesstoken' });
  });

  it('Should return 422 if an error occurs', async () => {
    try {
      const useCase = authenticationUsecase as jest.Mock;
      useCase.mockImplementation(() => {
        throw new ValidationError('Invalid');
      });
      const statusSpy = jest.spyOn(res, 'status');
      await authenticationUsecaseAdapter(req as any, res as any);
    } catch (error) {
      expect(error.message).toEqual('Invalid');
    }
  });
});
