import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from './firebase-authentication.middleware';
import getUserUsecase from '../../core/usecases/get-user.usecase';
import userPrismaRepository from '../../infra/user.prisma-repository';
import User from '../../core/entities/user';
import UserRepository from '../../core/repositories/user.repository';

export interface RequestWithProfile extends Request {
  profile: User;
}

const profileMiddleware =  async (req: AuthenticatedRequest | Request, res: Response, next: NextFunction) => {
  try {
    const email = (req as AuthenticatedRequest).email as string;
    (req as RequestWithProfile).profile = await getUserUsecase({ email } as Partial<User> as User, userPrismaRepository as unknown as UserRepository);

    return next();
  } catch(err) {
    return res
      .status(404)
      .send({error: 'User not found!'});
  }
};

export default profileMiddleware;
