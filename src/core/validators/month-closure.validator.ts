import { MonthClosure } from '../entities';
import propertyValidator from './property.validator';

const monthClosureValidator = (monthClosure: MonthClosure): boolean => {
  const hasMonth = propertyValidator('month', monthClosure);
  const hasYear = propertyValidator('year', monthClosure);
  const hasTotal = propertyValidator('total', monthClosure);
  const hasAvailable = propertyValidator('available', monthClosure);
  const hasExpenses = propertyValidator('expenses', monthClosure);

  return hasMonth && hasYear && hasTotal && hasAvailable && hasExpenses;
};

export default monthClosureValidator;
