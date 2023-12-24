import bCrypt from 'bcrypt';

import User from '../entities/user';
import { log } from '../logger/logger';
import UserRepository from '../repositories/user.repository';
import ValidationError from '../errors/validation.error';
import userValidator from '../validators/user.validator';

const createUserUsecase = async (
  user: User,
  repository: UserRepository
): Promise<User> => {
  log(`[createUserUseCase]: validating user ${user.email} information`);
  const isValid = userValidator(user);
  if (!isValid) {
    log(`[createUserUseCase]: user ${user.email} has invalid data`);
    throw new ValidationError(`Invalid user data: ${JSON.stringify(user)}`);
  }
  log(`[createUserUseCase]: encrypting user ${user.email} password`);
  const saltRounds = 12; // configurable value
  const hashedUser = {
    ...user,
    password: await bCrypt.hash(user.password, saltRounds)
  };
  log(`[createUserUseCase]: persisting new user ${user.email}`);
  return repository.create(hashedUser);
};

export default createUserUsecase;
