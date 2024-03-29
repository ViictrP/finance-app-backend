import {CreditCardRepository} from '../repositories';
import {log} from '../logger/logger';
import {CreditCard} from '../entities';
import {NotFoundError} from "../errors";

const deleteCreditCardUsecase = async (id: string, repository: CreditCardRepository) => {
  log(`[deleteCreditCardUseCase]: getting credit card information id `, id);
  const creditCard = await repository.get({ id } as CreditCard, false);

  if (!creditCard) {
    log(`[deleteCreditCardUseCase]: getting credit card information id `, id);
    throw new NotFoundError(`credit card not found for id ${id}`);
  }

  log(`[deleteCreditCardUseCase]: deletting credit card information id `, id);
  return repository.deleteOne(creditCard);
};

export default deleteCreditCardUsecase;
