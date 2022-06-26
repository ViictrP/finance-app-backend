import User from '../entities/User';

export type GetUserRepository = {
  get: (user: User) => Promise<User | null>;
}
