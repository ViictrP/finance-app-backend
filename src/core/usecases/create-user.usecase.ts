import bCrypt from 'bcrypt';

import User from '../entities/user';
import { UserRepository } from '../repositories';
import { userValidator } from '../validators';
import { log } from '../logger/logger';
import { ValidationError } from '../errors';

const createUserUsecase = async (user: User, repository: UserRepository): Promise<User> => {
  log(`[createUserUseCase]: validating user ${user.email} information`);
  const isValid = userValidator(user);
  if (!isValid) {
    log(`[createUserUseCase]: user ${user.email} has invalid data`);
    throw new ValidationError(`Invalid user data: ${JSON.stringify(user)}`);
  }
  log(`[createUserUseCase]: encrypting user ${user.email} password`);
  const saltRounds = 12; // configurable value
  const hashedUser = { ...user, password: await bCrypt.hash(user.password, saltRounds) };
  log(`[createUserUseCase]: persisting new user ${user.email}`);
  return repository.create(hashedUser);
};

export default createUserUsecase;
