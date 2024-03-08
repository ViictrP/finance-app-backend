import propertyValidator from './property.validator';
import User from '../entities/user';

const userValidator = (user: User) => {
  const hasName = propertyValidator('name', user);
  const hasLastname = propertyValidator('lastname', user);
  const hasEmail = propertyValidator('email', user);
  const hasPassword = propertyValidator('password', user);
  return hasName && hasLastname && hasEmail && hasPassword;
};

export default userValidator;
