import { isAdminMiddleware } from '../../../../src/adapters/middlewares';
// @ts-ignore
import jwt from 'jsonwebtoken';

describe('idAdminMiddleware', () => {
  const notAdminRequest = {
    headers: {
      token: ''
    }
  };

  const invalidRequest = {
    headers: {}
  };

  const validRequest = {
    headers: {
      token: ''
    }
  };

  beforeEach(() => {
    process.env.TOKEN_HEADER_KEY = 'token';
    process.env.JWT_SECRET = 'secret';

    const data = { id: 1, email: 'admin@financeapp.com', time: new Date() };
    const signed = { accessToken: jwt.sign(data, 'secret') };
    validRequest.headers.token = signed.accessToken;

    const noAdmin = { id: 1, email: 'email@email.com', time: new Date() };
    const noAdminSigned = { accessToken: jwt.sign(noAdmin, 'secret') };
    notAdminRequest.headers.token = noAdminSigned.accessToken;

  });

  it('Should call next with if user is the admin', () => {
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
    isAdminMiddleware(validRequest as any, res as any, nextFn);
    expect(nextFn).toHaveBeenCalled();
  });

  it('Should call next with error if user isnt the admin', () => {
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
    isAdminMiddleware(notAdminRequest as any, res as any, nextFn);
    expect(statusSpy).toHaveBeenCalledWith(401);
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
    isAdminMiddleware(invalidRequest as any, res as any, nextFn);
    expect(statusSpy).toHaveBeenCalledWith(401);
  });
});
