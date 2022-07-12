import { CreditCard } from '../entities';
import propertyValidator from './propertyValidator';

const creditCardValidator = (creditCard: CreditCard): boolean => {
  return propertyValidator('title', creditCard);
};

export default creditCardValidator;
