import { log } from '../logger/logger';
import User from '../entities/User';
import { GetUserRepository } from '../repositories/getUserRepository';

const getUserUseCase = async (user: User, repository: GetUserRepository): Promise<User> => {
  log(`[getUserUseCase]: getting user by filter: ${user}`);
  const dbUser = await repository.get(user);
  if (!dbUser) {
    log(`[getUserUseCase]: user not found for the filter ${user}`);
    throw new Error(`user not found by filter ${user}`);
  }
  return dbUser;
};

export default getUserUseCase;
