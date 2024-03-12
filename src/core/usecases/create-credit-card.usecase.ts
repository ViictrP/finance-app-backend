import { log } from '../logger/logger';
import { MONTHS } from '../enums/month.enum';
import CreditCard from '../entities/credit-card';
import UserRepository from '../repositories/user.repository';
import CreditCardRepository from '../repositories/credit-card.repository';
import ValidationError from '../errors/validation.error';
import RequestError from '../errors/request.error';
import User from '../entities/user';
import Invoice from '../entities/invoice';
import creditCardValidator from '../validators/credit-card.validator';

const createCreditCardUseCase = async (
  creditCard: CreditCard,
  userRepository: UserRepository,
  repository: CreditCardRepository
): Promise<CreditCard> => {
  log(
    `[creditCardUseCase]: validating credit card ${creditCard.title} information`
  );
  const isValid = creditCardValidator(creditCard);
  if (!isValid) {
    log(
      `[creditCardUseCase]: credit card ${creditCard.title} has invalid data`
    );
    throw new ValidationError(`the credit card ${creditCard.title} is invalid`);
  }
  const hasCreditCard = await repository.get(creditCard, false);
  if (!!hasCreditCard) {
    log(
      `[creditCardUseCase]: User already has the credit card ${creditCard.title}`
    );
    throw new RequestError(
      `User already has the credit card ${creditCard.title}`
    );
  }
  log(
    '[creditCardUseCase]: finding the owner of the new credit card',
    creditCard.title
  );
  creditCard.user = { id: creditCard.user.id } as User;
  log(
    '[creditCardUseCase]: creating a new invoice for this credit card',
    creditCard.title
  );
  const today = new Date();
  const invoice: Partial<Invoice> = {
    month: MONTHS[today.getMonth()],
    year: today.getFullYear(),
    isClosed: false
  };
  (creditCard.id as unknown) = undefined;
  creditCard.invoiceClosingDay = Number(creditCard.invoiceClosingDay);
  creditCard.invoices = [invoice as Invoice];
  log(`[creditCardUseCase]: persisting new credit card ${creditCard.title}`);
  return repository.create(creditCard);
};

export default createCreditCardUseCase;
