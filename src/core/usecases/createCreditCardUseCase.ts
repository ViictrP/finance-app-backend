import { UserRepository } from '../repositories';
import { log } from '../logger/logger';
import { CreditCard } from '../entities';
import { creditCardValidator } from '../validators';
import { CreditCardRepository } from '../repositories';
import { MONTHS } from '../enums/month.enum';

const creditCardUseCase = async (creditCard: CreditCard, userRepository: UserRepository, repository: CreditCardRepository): Promise<CreditCard> => {
  log(`[creditCardUseCase]: validating credit card ${creditCard.title} information`);
  const isValid = creditCardValidator(creditCard);
  if (!isValid) {
    log(`[creditCardUseCase]: credit card ${creditCard.title} has invalid data`);
    throw new Error(`the user ${creditCard.title} is invalid`);
  }
  log('[creditCardUseCase]: finding the owner of the new credit card', creditCard.title);
  const user = await userRepository.get(creditCard.user);
  creditCard.user = { id: user!.id } as any;
  log('[creditCardUseCase]: creating a new invoice for this credit card', creditCard.title);
  const today = new Date();
  const invoice = {
    month: MONTHS[today.getMonth()],
    year: today.getFullYear(),
    isClosed: false
  };
  creditCard.invoices = [invoice as any];
  log(`[creditCardUseCase]: persisting new credit card ${creditCard.title}`);
  return repository.create(creditCard);
};

export default creditCardUseCase;
