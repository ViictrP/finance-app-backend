import request from 'supertest';
import server from '../../../src/server';
import firebaseAuthentication from '../../../src/adapters/middlewares/firebase-authentication.middleware';
import userPrismaRepository from '../../../src/infra/user.prisma-repository';
import UserRepository from '../../../src/core/repositories/user.repository';
import User from '../../../src/core/entities/user';
import profileMiddleware from '../../../src/adapters/middlewares/profile.middleware';

jest.mock<typeof firebaseAuthentication>(
  '../../../src/adapters/middlewares/firebase-authentication.middleware'
);
jest.mock<typeof profileMiddleware>(
  '../../../src/adapters/middlewares/profile.middleware'
);
jest.mock<typeof userPrismaRepository>(
  '../../../src/infra/user.prisma-repository'
);

describe('getMyProfileUseCaseAdapter', () => {
  const checkAuthorizationMock = firebaseAuthentication as jest.Mock;
  const profileMiddlewareMock = profileMiddleware as jest.Mock;

  afterEach(() => jest.clearAllMocks());

  it('Should return 422 if an error occurs', (done) => {
    defaultMockAuth({ id: 'test' });

    const repository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User | null>(null));

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found by filter [object Object]', done);
  });

  it('Should return a unauthorized', (done) => {
    checkAuthorizationMock.mockImplementation((_1, res, _3) => {
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
    defaultMockAuth(user);

    const repository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() =>
      Promise.resolve<User>(user as User)
    );

    request(server)
      .get('/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, user, done);
  });

  const defaultMockAuth = (user: Partial<User>) => {
    checkAuthorizationMock.mockImplementation((req, _, next) => {
      req.email = 'a@a.com';
      return next();
    });

    profileMiddlewareMock.mockImplementation((__, _, next) => next());
  };
});
