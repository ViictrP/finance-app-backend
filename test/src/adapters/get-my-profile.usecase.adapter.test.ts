// @ts-ignore
import request from 'supertest';
import { ValidationError } from '../../../src/core/errors';
import { getUserUsecase } from '../../../src/core/usecases';
import server from '../../../src/server';
import { isAuthorizedMiddleware } from '../../../src/adapters/middlewares';

jest.mock('../../../src/core/usecases/get-user.usecase');
jest.mock('../../../src/adapters/middlewares/is-authorized.middleware');

describe('getMyProfileUseCaseAdapter', () => {

  afterEach(() => jest.clearAllMocks());

  it('Should return 422 if an error occurs', (done) => {
    const user = { id: 'test' };
    const middleware = isAuthorizedMiddleware as jest.Mock;
    middleware.mockImplementation((req, res, next) => {
      res.locals.user = user;
      return next();
    });

    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => {
      throw new ValidationError('Error');
    });

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(422, 'Error', done);
  });

  it('Should return a unauthorized', (done) => {
    const middleware = isAuthorizedMiddleware as jest.Mock;
    middleware.mockImplementation((req, res, next) => {
      res.status(401).json({ message: 'unauthorized' });
    });

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, { message: 'unauthorized' }, done);
  });

  it('Should return a message', (done) => {
    const user = { id: 'test' };
    const middleware = isAuthorizedMiddleware as jest.Mock;
    middleware.mockImplementation((req, res, next) => {
      res.locals.user = user;
      return next();
    });

    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => (user));

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, user, done);
  });
});
