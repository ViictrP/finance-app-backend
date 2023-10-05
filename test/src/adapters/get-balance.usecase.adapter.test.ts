import request from 'supertest';
import server from '../../../src/server';
import { User } from '../../../src/core/entities';
import { userPrismaRepository } from '../../../src/infra';
import { UserRepository } from '../../../src/core/repositories';
import {
  oAuth0CheckAuthentication,
  oAuth0CheckAuthorization
} from '../../../src/adapters/middlewares';

jest.mock<typeof oAuth0CheckAuthentication>(
  '../../../src/adapters/middlewares/oauth0-authentication.middleware'
);
jest.mock<typeof oAuth0CheckAuthorization>(
  '../../../src/adapters/middlewares/oauth0-authorization.middleware'
);
jest.mock<typeof userPrismaRepository>(
  '../../../src/infra/user.prisma-repository'
);

describe('getBalanceUseCaseAdapter', () => {
  const checkAuthorizationMock = oAuth0CheckAuthorization as jest.Mock;
  const checkAuthenticationMock = oAuth0CheckAuthentication as jest.Mock;

  it("Should return user's balance", (done) => {
    const user: Partial<User> = {
      id: 'test',
      salary: 1000,
      creditCards: [],
      recurringExpenses: [],
      transactions: [],
      monthClosures: []
    };

    defaultMockAuth(user);

    const repository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() =>
      Promise.resolve<User>(user as User)
    );

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          salary: 1000,
          expenses: 0,
          available: 1000,
          creditCardExpenses: {},
          creditCards: [],
          transactions: [],
          recurringExpenses: []
        },
        done
      );
  });

  it('Should return an error if request has no user', (done) => {
    defaultMockAuth(undefined as any);

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, 'user is required to calculate the balance', done);
  });

  it('Should return an error if user doesnt exist', (done) => {
    defaultMockAuth({ id: 'test' });

    const repository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User | null>(null));

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found for the filter [object Object]', done);
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
