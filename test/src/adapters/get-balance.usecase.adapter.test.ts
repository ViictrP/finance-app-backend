import request from 'supertest';
import server from '../../../src/server';
import { User } from '../../../src/core/entities';
import { userPrismaRepository } from '../../../src/infra';
import { UserRepository } from '../../../src/core/repositories';
import { firebaseAuthentication } from '../../../src/adapters/middlewares';

jest.mock<typeof firebaseAuthentication>(
  '../../../src/adapters/middlewares/firebase-authentication.middleware'
);
jest.mock<typeof userPrismaRepository>(
  '../../../src/infra/user.prisma-repository'
);

describe('getBalanceUseCaseAdapter', () => {
  const checkAuthorizationMock = firebaseAuthentication as jest.Mock;

  it("Should return user's balance", (done) => {
    const user: Partial<User> = {
      id: 'test',
      salary: 1000,
      creditCards: [],
      recurringExpenses: [],
      transactions: [],
      monthClosures: []
    };

    defaultMockAuth('a@a.com');

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
      .expect(400, `User's email is required to calculate the balance`, done);
  });

  it('Should return an error if user doesnt exist', (done) => {
    defaultMockAuth('a@a.com');

    const repository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User | null>(null));

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found for the filter a@a.com', done);
  });

  const defaultMockAuth = (email: string) => {
    checkAuthorizationMock.mockImplementation((req, _, next) => {
      req.email = email;
      return next();
    });
  };
});
