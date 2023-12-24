import propertyValidator from './property.validator';
import CreditCard from '../entities/credit-card';

const creditCardValidator = (creditCard: CreditCard): boolean => {
  const hasTitle = propertyValidator('title', creditCard);
  const hasInvoiceClosingDay = creditCard.invoiceClosingDay > 0;
  return hasTitle && hasInvoiceClosingDay;
};

export default creditCardValidator;
