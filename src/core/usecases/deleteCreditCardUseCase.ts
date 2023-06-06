import { CreditCardRepository } from '../repositories';
import { log } from '../logger/logger';
import { CreditCard } from '../entities';

const deleteCreditCardUseCase = async (id: string, repository: CreditCardRepository) => {
  log(`[deleteCreditCardUseCase]: getting credit card information id `, id);
  const creditCard = await repository.get({ id } as CreditCard, false);

  if (!creditCard) {
    log(`[deleteCreditCardUseCase]: getting credit card information id `, id);
    throw new Error(`credit card not found for id ${id}`);
  }

  log(`[deleteCreditCardUseCase]: deletting credit card information id `, id);
  return repository.deleteOne(creditCard);
};

export default deleteCreditCardUseCase;
