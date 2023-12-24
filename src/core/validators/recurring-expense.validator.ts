import propertyValidator from './property.validator';
import RecurringExpense from '../entities/recurring-expense';

const recurringExpenseValidator = (recurringExpense: RecurringExpense) => {
  const hasDescription = propertyValidator('description', recurringExpense);
  const hasAmount = propertyValidator('amount', recurringExpense);
  return hasDescription && hasAmount;
};

export default recurringExpenseValidator;
