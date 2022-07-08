import User from '../entities/User';
import { log } from '../../core/logger/logger';
import { UserRepository } from '../../core/repositories/userRepository';
import getUserUseCase from '../../core/usecases/getUserUseCase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Authentication from '../entities/Authentication';

const authenticationUseCase = async ({
                                       email,
                                       password,
                                     }: User, repository: UserRepository): Promise<Authentication> => {
  log(`[authenticationUseCase]: getting user by email: ${email}`);
  const user = await getUserUseCase({ email } as any, repository);
  if (!user) {
    log(`user not found for email ${email}`);
    throw new Error(`user not found for email ${email}`);
  }
  log('[authenticationUseCase]: validating credentials');
  const passwordIsEqual = await bcrypt.compare(password, user.password);
  if (!passwordIsEqual) {
    log('[authenticationUseCase]: invalid credentials');
    throw new Error('invalid credentials');
  }
  const secret = process.env.JWT_SECRET;
  const data = { id: user.id, email: user.email, time: new Date() };
  return { accessToken: jwt.sign(data, secret as string) };
};

export default authenticationUseCase;
