import User from '../entities/User';

export type UserRepository = {
  create: (user: User) => Promise<User>;
  get: (user: User) => Promise<User | null>;
  update: (user: User) => Promise<User>;
}
