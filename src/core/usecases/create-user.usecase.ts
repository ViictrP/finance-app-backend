import bCrypt from 'bcrypt';

import User from '../entities/user';
import { UserRepository } from '../repositories';
import { userValidator } from '../validators';
import { log } from '../logger/logger';

const createUserUsecase = async (user: User, repository: UserRepository): Promise<User> => {
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

export default createUserUsecase;
