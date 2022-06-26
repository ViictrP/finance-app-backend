import bCrypt from 'bcrypt';

import User from '../entities/User';
import { CreateUserRepository } from '../repositories/createUserRepository';
import userValidator from '../validators/userValidator';
import { log } from '../logger/logger';

const createUserUseCase = async (user: User, repository: CreateUserRepository): Promise<User> => {
  log(`[createUserUseCase]: validating user ${user.email} information`);
  const isValid = userValidator(user);
  if (!isValid) {
    log(`[createUserUseCase]: user ${user.email} has invalid data`);
    throw new Error(`the user ${user.name} is invalid`);
  }
  log(`[createUserUseCase]: encrypting user ${user.email} password`);
  user.password = await bCrypt.hash(user.password, 10);
  log(`[createUserUseCase]: persisting new user ${user.email}`);
  return repository.create(user);
};

export default createUserUseCase;
