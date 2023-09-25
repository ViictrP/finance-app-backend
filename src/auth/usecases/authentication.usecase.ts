import UserDto from '../dto/user.dto';
import {log} from '../../core/logger/logger';
import {UserRepository} from '../../core/repositories';
import getUserUsecase from '../../core/usecases/get-user.usecase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthenticationDto from '../dto/authentication.dto';
import {User} from '../../core/entities';
import {RequestError} from "../../core/errors";

type JwtData = {
  id: string;
  email: string;
  time: Date;
};

const authenticationUsecase = async ({
                                       email,
                                       password,
                                     }: UserDto, repository: UserRepository): Promise<AuthenticationDto> => {
  try {
    log(`[authenticationUseCase]: getting user by email: ${email}`);
    const userDto: Partial<User> = {email: email.toLowerCase()};
    const user = await getUserUsecase(userDto as User, repository);

    log('[authenticationUsecase]: validating credentials');
    const passwordIsEqual = await bcrypt.compare(password, user.password);
    if (!passwordIsEqual) {
      log('[authenticationUsecase]: invalid credentials');
      throw new RequestError('invalid credentials');
    }
    const secret = process.env.JWT_SECRET!;
    const data: JwtData = {id: user.id, email: user.email, time: new Date()};
    return {accessToken: jwt.sign(data, secret)};
  } catch (error: any) {
    log(`[authenticationUsecase]: ${error.message}`);
    throw new RequestError('invalid credentials');
  }
};

export default authenticationUsecase;
