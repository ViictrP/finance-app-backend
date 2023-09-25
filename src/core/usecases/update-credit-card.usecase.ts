import { CreditCard } from '../entities';
import { CreditCardRepository } from '../repositories';
import { log } from '../logger/logger';
import {RequestError} from "../errors";

const updateCreditCardUsecase = async (creditCard: CreditCard, repository: CreditCardRepository) => {
  const { id } = creditCard;
  log(`[updateCreditCardUseCase]: getting credit card data ${creditCard.title}`);
  const savedCreditCard = await repository.get({ id } as CreditCard, false);
  if (!savedCreditCard) {
    log(`[updateUserUseCase]: credit card not found for the filter ${creditCard}`);
    throw new RequestError(`credit card not found by filter ${creditCard}`);
  }

  if (creditCard.number !== savedCreditCard.number) {
    log(`[updateUserUseCase]: verifing if there is a credit card with this ${creditCard.number} number`);
    const existingCreditCard = await repository.get({
      number: creditCard.number,
      user: { id: creditCard.user.id },
    } as CreditCard, false);
    if (existingCreditCard) {
      log(`[updateUserUseCase]: you already have a credit card with this ${creditCard.number} number`);
      throw new RequestError(`credit card already exists for this number ${creditCard.number}`);
    }
  }


  log(`[updateCreditCardUseCase]: updating credit card data ${creditCard.title}`);
  savedCreditCard.title = creditCard.title ?? savedCreditCard.title;
  savedCreditCard.number = creditCard.number && creditCard.number !== savedCreditCard.number ? creditCard.number : savedCreditCard.number;
  savedCreditCard.description = creditCard.description ?? savedCreditCard.description;
  savedCreditCard.backgroundColor = creditCard.backgroundColor ?? savedCreditCard.backgroundColor;
  savedCreditCard.number = creditCard.number;
  savedCreditCard.invoiceClosingDay = Number(creditCard.invoiceClosingDay);
  return repository.update(savedCreditCard);
};

export default updateCreditCardUsecase;
