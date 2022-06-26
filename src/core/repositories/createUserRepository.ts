import User from '../entities/User';

export type CreateUserRepository = {
  create: (user: User) => Promise<User>;
}
