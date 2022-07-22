import { CreditCard } from '../entities';
import propertyValidator from './propertyValidator';

const creditCardValidator = (creditCard: CreditCard): boolean => {
  const hasTitle = propertyValidator('title', creditCard);
  const hasInvoiceClosingDay = creditCard.invoiceClosingDay > 0;
  return hasTitle && hasInvoiceClosingDay;
};

export default creditCardValidator;
