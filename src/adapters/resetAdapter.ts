import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { prisma } from '../infra/prisma';
import jwt from 'jsonwebtoken';

const resetAdapter = async (req: Request, res: Response) => {
  log('[resetAdapter]: reset data request received');
  const { headers } = req;
  const token = headers[process.env.TOKEN_HEADER_KEY as string] as string;
  log('[resetAdapter]: extracting user data from access token');
  const { email } = jwt.verify(token, process.env.JWT_SECRET as string) as any;

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  await prisma.creditCard.deleteMany({
    where: {
      user: {
        ...user
      }
    }
  });
  log('[resetAdapter]: data wiped');
  res.status(204).json({ message: `user ${email} data wiped` });
};

export default resetAdapter;
