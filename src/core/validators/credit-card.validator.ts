import { CreditCard } from '../entities';
import propertyValidator from './property.validator';

const creditCardValidator = (creditCard: CreditCard): boolean => {
  const hasTitle = propertyValidator('title', creditCard);
  const hasInvoiceClosingDay = creditCard.invoiceClosingDay > 0;
  return hasTitle && hasInvoiceClosingDay;
};

export default creditCardValidator;
