import UserDto from '../dto/user.dto';
import { log } from '../../core/logger/logger';
import { UserRepository } from '../../core/repositories';
import getUserUsecase from '../../core/usecases/get-user.usecase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthenticationDto from '../dto/authentication.dto';
import { RequestError } from '../../core/errors/request.error';

const authenticationUsecase = async ({
                                       email,
                                       password,
                                     }: UserDto, repository: UserRepository): Promise<AuthenticationDto> => {
  log(`[authenticationUseCase]: getting user by email: ${email}`);
  const lowerCasedEmail = email.toLowerCase();
  const user = await getUserUsecase({ email: lowerCasedEmail } as any, repository);

  log('[authenticationUsecase]: validating credentials');
  const passwordIsEqual = await bcrypt.compare(password, user.password);
  if (!passwordIsEqual) {
    log('[authenticationUsecase]: invalid credentials');
    throw new RequestError('invalid credentials');
  }
  const secret = process.env.JWT_SECRET;
  const data = { id: user.id, email: user.email, time: new Date() };
  const token = jwt.sign(data, secret as string);
  return { accessToken: token };
};

export default authenticationUsecase;
