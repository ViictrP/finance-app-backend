import { isAuthorizedMiddleware } from '../../../src/adapters/middlewares';
import request from 'supertest';
import server from '../../../src/server';
import { User } from '../../../src/core/entities';
import { userPrismaRepository } from '../../../src/infra';
import { UserRepository } from '../../../src/core/repositories';

jest.mock<typeof isAuthorizedMiddleware>('../../../src/adapters/middlewares/is-authorized.middleware');
jest.mock<typeof userPrismaRepository>('../../../src/infra/user.prisma-repository');

describe('getBalanceUseCaseAdapter', () => {

  it('Should return user\'s balance', (done) => {
    const user: Partial<User> = {
      id: 'test',
      salary: 1000,
      creditCards: [],
      recurringExpenses: [],
      transactions: [],
      monthClosures: [],
    };

    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User>(user as User));

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        salary: 1000,
        expenses: 0,
        available: 1000,
        creditCardExpenses: {},
        creditCards: [],
        transactions: [],
        recurringExpenses: [],
      }, done);
  });

  it('Should return an error if request has no user', (done) => {
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = undefined;
      return next();
    });

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, 'user is required to calculate the balance', done);
  });

  it('Should return an error if user doesnt exist', (done) => {
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = { id: 'test' };
      return next();
    });

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => Promise.resolve<User | null>(null));

    request(server)
      .get('/balances')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found for the filter [object Object]', done);
  });
});
