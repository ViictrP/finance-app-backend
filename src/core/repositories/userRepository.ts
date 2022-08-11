import { User } from '../entities';

export type UserRepository = {
  create: (user: User) => Promise<User>;
  get: (user: User, month?: string, year?: number) => Promise<User | null>;
  update: (user: User) => Promise<User>;
}
