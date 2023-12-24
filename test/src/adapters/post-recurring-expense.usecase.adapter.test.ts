import RecurringExpense from '../../../src/core/entities/recurring-expense';
import User from '../../../src/core/entities/user';
import firebaseAuthentication from '../../../src/adapters/middlewares/firebase-authentication.middleware';
import RecurringExpenseRepository from '../../../src/core/repositories/recurring-expense.repository';
import userPrismaRepository from '../../../src/infra/user.prisma-repository';
import recurringExpensePrismaRepository from '../../../src/infra/recurring-expense.prisma-repository';
import UserRepository from '../../../src/core/repositories/user.repository';
import request from 'supertest';
import server from '../../../src/server';

jest.mock<typeof firebaseAuthentication>(
  '../../../src/adapters/middlewares/firebase-authentication.middleware'
);

jest.mock<typeof recurringExpensePrismaRepository>(
  '../../../src/infra/recurring-expense.prisma-repository'
);

jest.mock<typeof userPrismaRepository>(
  '../../../src/infra/user.prisma-repository'
);

describe('createRecurringExpenseUseCaseAdapter', () => {
  const originalEnv = process.env;
  const checkAuthorizationMock = firebaseAuthentication as jest.Mock;

  it('Should create recurring expense with success', (done) => {
    const user: Partial<User> = {
      id: 'test',
      salary: 1000,
      creditCards: [],
      recurringExpenses: [],
      transactions: [],
      monthClosures: []
    };

    const data: RecurringExpense = {
      id: 'TEST',
      description: 'TEST',
      amount: 1000,
      createdAt: new Date(),
      user: user as User,
      category: 'OTHER',
      deleted: false,
      deleteDate: undefined
    };

    defaultMockAuth('a@a.com');
    const userRepository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    userRepository.get.mockImplementation(() =>
      Promise.resolve<User>(user as User)
    );

    const repository =
      recurringExpensePrismaRepository as unknown as jest.Mocked<RecurringExpenseRepository>;
    repository.create.mockImplementation(() =>
      Promise.resolve<RecurringExpense>(data)
    );

    request(server)
      .post('/recurring-expenses')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toEqual({
          id: 'TEST',
          description: 'TEST',
          amount: 1000,
          createdAt: expect.any(String),
          user: {
            id: 'test',
            salary: 1000,
            creditCards: [],
            recurringExpenses: [],
            transactions: [],
            monthClosures: []
          },
          category: 'OTHER',
          deleted: false
        });

        done();
      });
  });

  it('Should return error if recurring expense is invalid', (done) => {
    const user: Partial<User> = {
      id: 'test',
      salary: 1000,
      creditCards: [],
      recurringExpenses: [],
      transactions: [],
      monthClosures: []
    };

    const data: Partial<RecurringExpense> = {
      id: 'TEST',
      user: user as User,
      category: 'OTHER',
      deleted: false,
      deleteDate: undefined
    };

    defaultMockAuth('a@a.com');
    const userRepository =
      userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    userRepository.get.mockImplementation(() =>
      Promise.resolve<User>(user as User)
    );

    const repository =
      recurringExpensePrismaRepository as unknown as jest.Mocked<RecurringExpenseRepository>;
    repository.create.mockImplementation(() =>
      Promise.resolve<RecurringExpense>(data as RecurringExpense)
    );

    request(server)
      .post('/recurring-expenses')
      .set('Accept', 'application/json')
      .send(data)
      .expect(422, 'The recurring expense undefined has invalid data', done);
  });

  const defaultMockAuth = (email: string) => {
    checkAuthorizationMock.mockImplementation((req, _, next) => {
      req.email = email;
      return next();
    });
  };
});
