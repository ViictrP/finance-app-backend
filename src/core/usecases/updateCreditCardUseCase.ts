import { CreditCard } from '../entities';
import { CreditCardRepository } from '../repositories';
import { log } from '../logger/logger';

const updateCreditCardUseCase = async (creditCard: CreditCard, repository: CreditCardRepository) => {
  const { id } = creditCard;
  log(`[updateCreditCardUseCase]: getting credit card data ${creditCard.title}`);
  const savedCreditCard = await repository.get({ id } as any);
  if (!savedCreditCard) {
    log(`[updateUserUseCase]: credit card not found for the filter ${creditCard}`);
    throw new Error(`credit card not found by filter ${creditCard}`);
  }
  log(`[updateCreditCardUseCase]: updating credit card data ${creditCard.title}`);
  savedCreditCard.title = creditCard.title ?? savedCreditCard.title;
  savedCreditCard.number = creditCard.number ?? savedCreditCard.number;
  savedCreditCard.description = creditCard.description ?? savedCreditCard.description;
  savedCreditCard.backgroundColor = creditCard.backgroundColor ?? savedCreditCard.backgroundColor;
  return repository.update(savedCreditCard);
};

export default updateCreditCardUseCase;
