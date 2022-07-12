import { log } from '../logger/logger';
import { User } from '../entities';
import { UserRepository } from '../repositories';

const getUserUseCase = async (user: User, repository: UserRepository): Promise<User> => {
  log(`[getUserUseCase]: getting user by filter: ${user}`);
  const savedUser = await repository.get(user);
  if (!savedUser) {
    log(`[getUserUseCase]: user not found for the filter ${user}`);
    throw new Error(`user not found by filter ${user}`);
  }
  return savedUser;
};

export default getUserUseCase;
