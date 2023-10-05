import request from 'supertest';
import server from '../../../src/server';
import {
  oAuth0CheckAuthentication,
  oAuth0CheckAuthorization
} from '../../../src/adapters/middlewares';
import { userPrismaRepository } from '../../../src/infra';
import { UserRepository } from '../../../src/core/repositories';
import { User } from '../../../src/core/entities';

jest.mock<typeof oAuth0CheckAuthentication>(
  '../../../src/adapters/middlewares/oauth0-authentication.middleware'
);
jest.mock<typeof oAuth0CheckAuthorization>(
  '../../../src/adapters/middlewares/oauth0-authorization.middleware'
);
jest.mock<typeof userPrismaRepository>(
  '../../../src/infra/user.prisma-repository'
);

describe('getMyProfileUseCaseAdapter', () => {
  const checkAuthorizationMock = oAuth0CheckAuthorization as jest.Mock;
  const checkAuthenticationMock = oAuth0CheckAuthentication as jest.Mock;

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
    checkAuthenticationMock.mockImplementation((_1, res, _3) => {
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
    checkAuthorizationMock.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    checkAuthenticationMock.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });
  };
});
