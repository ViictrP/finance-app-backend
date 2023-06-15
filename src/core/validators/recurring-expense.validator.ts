import { RecurringExpense } from '../entities';
import propertyValidator from './property.validator';
const recurringExpenseValidator = (recurringExpense: RecurringExpense) => {
  const hasDescription = propertyValidator('description', recurringExpense);
  const hasAmount = propertyValidator('amount', recurringExpense);
  return hasDescription && hasAmount;
};

export default recurringExpenseValidator;
