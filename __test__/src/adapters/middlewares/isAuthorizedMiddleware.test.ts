// @ts-ignore
import jwt from 'jsonwebtoken';
import { isAuthorizedMiddleware } from '../../../../src/adapters/middlewares';

describe('isAuthorizedMiddleware', () => {

  const validRequest = {
    headers: {
      token: ''
    }
  };

  const invalidRequest = {
    headers: {}
  };

  beforeEach(() => {
    process.env.TOKEN_HEADER_KEY = 'token';
    process.env.JWT_SECRET = 'secret';

    const data = { id: 1, email: 'email@email.com', time: new Date() };
    const signed = { accessToken: jwt.sign(data, 'secret') };
    validRequest.headers.token = signed.accessToken;
  });

  it('Should call next if user is authorized', () => {
    const nextFn = jest.fn();
    const res = {
      locals: {}
    };
    isAuthorizedMiddleware(validRequest as any, res as any, nextFn);
    expect(nextFn).toHaveBeenCalled();
  });

  it('Should call next with error if user isnt authorized', () => {
    const nextFn = jest.fn();
    const res = {
      locals: {},
      status: () => (
        {
          json: jest.fn()
        }
      )
    };
    const statusSpy = jest.spyOn(res, 'status');
    isAuthorizedMiddleware(invalidRequest as any, res as any, nextFn);
    expect(statusSpy).toHaveBeenCalledWith(401);
  });
});
