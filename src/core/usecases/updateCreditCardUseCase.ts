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

  if (creditCard.number !== savedCreditCard.number) {
    log(`[updateUserUseCase]: verifing if there is a credit card with this ${creditCard.number} number`);
    const existingCreditCard = await repository.get({ number: creditCard.number } as any);
    if (existingCreditCard) {
      log(`[updateUserUseCase]: you already have a credit card with this ${creditCard.number} number`);
      throw new Error(`credit card already exists for this number ${creditCard.number}`);
    }
  }


  log(`[updateCreditCardUseCase]: updating credit card data ${creditCard.title}`);
  savedCreditCard.title = creditCard.title ?? savedCreditCard.title;
  savedCreditCard.number = creditCard.number && creditCard.number !== savedCreditCard.number ? creditCard.number : savedCreditCard.number;
  savedCreditCard.description = creditCard.description ?? savedCreditCard.description;
  savedCreditCard.backgroundColor = creditCard.backgroundColor ?? savedCreditCard.backgroundColor;
  return repository.update(savedCreditCard);
};

export default updateCreditCardUseCase;