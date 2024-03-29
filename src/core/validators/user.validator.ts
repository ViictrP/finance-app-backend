import { User } from '../entities';
import propertyValidator from './property.validator';

const userValidator = (user: User) => {
  const hasName = propertyValidator('name', user);
  const hasEmail = propertyValidator('email', user);
  const hasPassword = propertyValidator('password', user);
  return hasName && hasEmail && hasPassword;
};

export default userValidator;
