import { TransactionRepository } from '../repositories';
import { log } from '../logger/logger';
import { RequestError } from '../errors/request.error';

const deleteTransactionUsecase = async (id: string, all: boolean, repository: TransactionRepository) => {
  log(`[deleteTransactionUseCase]: getting transaction information id `, id);
  const transaction = await repository.get({ id } as any);

  if (!transaction) {
    log(`[deleteTransactionUseCase]: getting transaction information id `, id);
    throw new RequestError(`transaction not found for id ${id}`);
  }

  log(`[deleteTransactionUseCase]: deletting transaction information id `, id);
  return repository.deleteTransaction(transaction, all);
};

export default deleteTransactionUsecase;
