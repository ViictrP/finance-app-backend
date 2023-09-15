import { log } from '../logger/logger';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { RequestError } from '../errors/request.error';
import { NotFoundError } from '../errors/not-found.error';

const getUserUsecase = async (user: User, repository: UserRepository): Promise<User> => {
  log(`[getUserUseCase]: getting user by filter: ${user}`);
  const savedUser = await repository.get(user);
  if (!savedUser) {
    log(`[getUserUseCase]: user not found for the filter ${user}`);
    throw new NotFoundError(`user not found by filter ${user}`);
  }
  savedUser.monthClosures.reverse();
  return savedUser;
};

export default getUserUsecase;
