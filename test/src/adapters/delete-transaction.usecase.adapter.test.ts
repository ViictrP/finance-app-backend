import request from 'supertest';
import server from '../../../src/server';
import { TransactionRepository } from '../../../src/core/repositories';
import { transactionPrismaRepository } from '../../../src/infra';
import { Transaction, User } from '../../../src/core/entities';
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
jest.mock<TransactionRepository>(
  '../../../src/infra/transaction.prisma-repository'
);

describe('deleteTransactionUseCaseAdapter', () => {
  const checkAuthorizationMock = oAuth0CheckAuthorization as jest.Mock;
  const checkAuthenticationMock = oAuth0CheckAuthentication as jest.Mock;

  it('Should return a message', (done) => {
    const user = { id: 'test' };
    defaultMockAuth(user);

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
    const user = { id: 'test' };
    defaultMockAuth(user);

    const repository =
      transactionPrismaRepository as unknown as jest.Mocked<TransactionRepository>;
    repository.get.mockImplementation(() =>
      Promise.resolve<Transaction | null>(null)
    );

    request(server)
      .delete('/transactions/test')
      .expect(404, 'transaction not found for id test', done);
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
