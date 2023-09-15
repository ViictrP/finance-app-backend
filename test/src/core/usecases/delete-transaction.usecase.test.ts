import { deleteTransactionUsecase } from '../../../../src/core/usecases';

describe('deleteTransactionUseCase', () => {
  const repository = {
    get: jest.fn(),
    deleteTransaction: jest.fn()
  };

  it('Should delete transaction with success', async () => {
    const transaction = {};
    jest.spyOn(repository, 'get').mockImplementation(() => (transaction));

    await deleteTransactionUsecase('test', false, repository as any);

    expect(repository.deleteTransaction).toHaveBeenCalledWith(transaction, false);
  });

  it('Should delete all transactions', async () => {
    const transaction = {};
    jest.spyOn(repository, 'get').mockImplementation(() => (transaction));

    await deleteTransactionUsecase('test', true, repository as any);

    expect(repository.deleteTransaction).toHaveBeenCalledWith(transaction, true);
  });

  it('Should throw error if transaction doesnt exist', async () => {
    jest.spyOn(repository, 'get').mockImplementation(() => null);

    await expect(deleteTransactionUsecase('test', false, repository as any))
      .rejects
      .toThrowError(new Error('transaction not found for id test'));
  });
});
