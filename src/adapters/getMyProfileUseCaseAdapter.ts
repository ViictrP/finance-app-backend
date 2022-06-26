import { log } from '../core/logger/logger';
import repository from '../infra/getUserPrismaRepository';
import { Request, Response } from 'express';
import getUserUseCase from '../core/usecases/getUserUseCase';
import jwt from 'jsonwebtoken';

const getMyProfileUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, headers } = req;
    log('[getMyProfileUseCaseAdapter]: get user data request received with body {}', body, { sensitive: ['password'] });
    const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
    log('[getMyProfileUseCaseAdapter]: extracting user data from access token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    log(`[getMyProfileUseCaseAdapter]: getting user ${id} data`);
    const user = await getUserUseCase({ id } as any, repository);
    log(`[getUserUseCaseAdapter]: user found [id]: ${user.id}`);
    res.status(200).json(user);
  } catch (error) {
    log(`[getUserUseCaseAdapter]: an error occured while getting user data [${error}]`);
    res.status(422).json({ error });
  }
};

export default getMyProfileUseCaseAdapter;
