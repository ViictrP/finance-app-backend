import { TransactionRepository } from '../repositories';
import { log } from '../logger/logger';

const deleteTransactionUseCase = async (id: string, repository: TransactionRepository) => {
  log(`[deleteTransactionUseCase]: getting transaction information id `, id);
  const transaction = await repository.get({ id } as any);

  if (!transaction) {
    log(`[deleteTransactionUseCase]: getting transaction information id `, id);
    throw new Error(`transaction not found for id ${id}`);
  }

  log(`[deleteTransactionUseCase]: deletting transaction information id `, id);
  return repository.deleteTransaction(transaction);
};

export default deleteTransactionUseCase;
