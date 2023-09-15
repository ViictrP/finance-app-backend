import request from 'supertest';
import { isAuthorizedMiddleware } from '../../../src/adapters/middlewares';
import server from '../../../src/server';
import { TransactionRepository } from '../../../src/core/repositories';
import { transactionPrismaRepository } from '../../../src/infra';
import { Transaction } from '../../../src/core/entities';

jest.mock<typeof isAuthorizedMiddleware>('../../../src/adapters/middlewares/is-authorized.middleware');
jest.mock<TransactionRepository>('../../../src/infra/transaction.prisma-repository');


describe('deleteTransactionUseCaseAdapter', () => {

  it('Should return a message', (done) => {
    const user = { id: 'test' };
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    const repository = transactionPrismaRepository as unknown as jest.Mocked<TransactionRepository>;
    repository.deleteTransaction.mockImplementation(() => Promise.resolve<void>(undefined));
    repository.get.mockImplementation(() => Promise.resolve<Transaction>({ id: 'test' } as Transaction));

    request(server)
      .delete('/transactions/test')
      .expect(204, '', done);
  });

  it('Should return an error if the transaction doesnt exist', (done) => {
    const user = { id: 'test' };
    const middleware = isAuthorizedMiddleware as jest.Mock<typeof isAuthorizedMiddleware>;
    middleware.mockImplementation((_, res, next) => {
      res.locals.user = user;
      return next();
    });

    const repository = transactionPrismaRepository as unknown as jest.Mocked<TransactionRepository>;
    repository.get.mockImplementation(() => Promise.resolve<Transaction | null>(null));

    request(server)
      .delete('/transactions/test')
      .expect(404, 'transaction not found for id test', done);
  });
});
