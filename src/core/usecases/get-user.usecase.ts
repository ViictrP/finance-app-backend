import { log } from '../logger/logger';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { MONTHS } from '../enums/month.enum';

const getUserUsecase = async (user: User, repository: UserRepository): Promise<User> => {
  log(`[getUserUseCase]: getting user by filter: ${user}`);
  const savedUser = await repository.get(user);
  if (!savedUser) {
    log(`[getUserUseCase]: user not found for the filter ${user}`);
    throw new Error(`user not found by filter ${user}`);
  }
  savedUser.monthClosures = savedUser.monthClosures.reverse();
  return savedUser;
};

export default getUserUsecase;
