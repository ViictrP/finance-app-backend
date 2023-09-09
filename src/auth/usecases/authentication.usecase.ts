import UserDto from '../dto/user.dto';
import { log } from '../../core/logger/logger';
import { UserRepository } from '../../core/repositories';
import getUserUsecase from '../../core/usecases/get-user.usecase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthenticationDto from '../dto/authentication.dto';
import { RequestError } from '../../core/errors/request.error';
import { ValidationError } from '../../core/errors';

const authenticationUsecase = async ({
                                       email,
                                       password,
                                     }: UserDto, repository: UserRepository): Promise<AuthenticationDto> => {
  log(`[authenticationUseCase]: getting user by email: ${email}`);
  const lowerCasedEmail = email.toLowerCase();
  const user = await getUserUsecase({ email: lowerCasedEmail } as any, repository);
  if (!user) {
    log(`user not found for email ${email}`);
    throw new RequestError(`user not found for email ${email}`);
  }
  log('[authenticationUsecase]: validating credentials');
  const passwordIsEqual = await bcrypt.compare(password, user.password);
  if (!passwordIsEqual) {
    log('[authenticationUsecase]: invalid credentials');
    throw new RequestError('invalid credentials');
  }
  const secret = process.env.JWT_SECRET;
  const data = { id: user.id, email: user.email, time: new Date() };
  return { accessToken: jwt.sign(data, secret as string) };
};

export default authenticationUsecase;
