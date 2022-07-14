import propertyValidator from './propertyValidator';
import { Transaction } from '../entities';

const transactionValidator = (transaction: Transaction) => {
  const hasDescription = propertyValidator('description', transaction);
  const hasUser = propertyValidator('user', transaction);
  const hasCategory = propertyValidator('category', transaction);
  const hasDate = propertyValidator('date', transaction);
  const hasAmount = propertyValidator('amount', transaction);
  return hasDescription && hasUser && hasCategory && hasDate && hasAmount;
};

export default transactionValidator;
