import User from '../entities/user';
import { log } from '../logger/logger';
import { UserRepository } from '../repositories';
import {RequestError} from "../errors";

const updateUserUsecase = async (user: User, repository: UserRepository): Promise<User> => {
  const { id }: Partial<User> = user;
  log(`[updateUserUseCase]: getting user data ${user.email}`);
  const savedUser = await repository.get({ id } as User);
  if (!savedUser) {
    log(`[updateUserUseCase]: user not found for the filter ${user}`);
    throw new RequestError(`user not found by filter ${user}`);
  }
  log(`[updateUserUseCase]: updating user data ${user.email}`);
  savedUser.email = user.email ?? savedUser.email;
  savedUser.name = user.name ?? savedUser.name ?? savedUser.lastname;
  savedUser.lastname = user.lastname;
  savedUser.salary = user.salary ?? savedUser.salary;
  return repository.update(user);
};

export default updateUserUsecase;
