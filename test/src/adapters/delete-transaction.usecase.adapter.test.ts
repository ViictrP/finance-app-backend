import request from 'supertest';
import server from '../../../src/server';
import { TransactionRepository } from '../../../src/core/repositories';
import { transactionPrismaRepository } from '../../../src/infra';
import { Transaction, User } from '../../../src/core/entities';
import { firebaseAuthentication } from '../../../src/adapters/middlewares';

jest.mock<typeof firebaseAuthentication>(
  '../../../src/adapters/middlewares/firebase-authentication.middleware'
);
jest.mock<TransactionRepository>(
  '../../../src/infra/transaction.prisma-repository'
);

describe('deleteTransactionUseCaseAdapter', () => {
  const checkAuthorizationMock = firebaseAuthentication as jest.Mock;

  it('Should return a message', (done) => {
    defaultMockAuth('a@a.com');

    const repository =
      transactionPrismaRepository as unknown as jest.Mocked<TransactionRepository>;
    repository.deleteTransaction.mockImplementation(() =>
      Promise.resolve<void>(undefined)
    );
    repository.get.mockImplementation(() =>
      Promise.resolve<Transaction>({ id: 'test' } as Transaction)
    );

    request(server).delete('/transactions/test').expect(204, '', done);
  });

  it('Should return an error if the transaction doesnt exist', (done) => {
    defaultMockAuth('a@a.com');

    const repository =
      transactionPrismaRepository as unknown as jest.Mocked<TransactionRepository>;
    repository.get.mockImplementation(() =>
      Promise.resolve<Transaction | null>(null)
    );

    request(server)
      .delete('/transactions/test')
      .expect(404, 'transaction not found for id test', done);
  });

  const defaultMockAuth = (email: string) => {
    checkAuthorizationMock.mockImplementation((req, _, next) => {
      req.email = email;
      return next();
    });
  };
});
