import propertyValidator from './property.validator';
import MonthClosure from '../entities/month-closure';

const monthClosureValidator = (monthClosure: MonthClosure): boolean => {
  const hasMonth = propertyValidator('month', monthClosure);
  const hasYear = propertyValidator('year', monthClosure);
  const hasTotal = propertyValidator('total', monthClosure);
  const hasAvailable = propertyValidator('available', monthClosure);
  const hasExpenses = propertyValidator('expenses', monthClosure);

  return hasMonth && hasYear && hasTotal && hasAvailable && hasExpenses;
};

export default monthClosureValidator;
