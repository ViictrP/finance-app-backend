import User from '../entities/user';

export default interface UserRepository {
  create: (user: User) => Promise<User>;
  get: (user: User, month?: string, year?: number) => Promise<User | null>;
  update: (user: User) => Promise<User>;
  deleteOne: (user: User) => Promise<User>;
}
