import request from 'supertest';
import server from '../../../src/server';
import { isAuthorizedMiddleware } from '../../../src/adapters/middlewares';
import { userPrismaRepository } from '../../../src/infra';
import { UserRepository } from '../../../src/core/repositories';
import { User } from '../../../src/core/entities';

jest.mock<typeof isAuthorizedMiddleware>('../../../src/adapters/middlewares/is-authorized.middleware');
jest.mock<typeof userPrismaRepository>('../../../src/infra/user.prisma-repository');

describe('getMyProfileUseCaseAdapter', () => {

  afterEach(() => jest.clearAllMocks());

  it('Should return 422 if an error occurs', (done) => {
    const user = { id: 'test' };
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User | null>(null));

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found by filter [object Object]', done);
  });

  it('Should return a unauthorized', (done) => {
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_1, res, _3) => {
      return res.status(401).json({ message: 'unauthorized' });
    });

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, { message: 'unauthorized' }, done);
  });

  it('Should return a message', (done) => {
    const user: Partial<User> = { id: 'test', monthClosures: [] };
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User>(user as User));

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, user, done);
  });
});
