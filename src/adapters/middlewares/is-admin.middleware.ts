import { log } from '../../core/logger/logger';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers } = req;
    log('[isAdminMiddleware]: verifying if user is the administrator');
    const token = headers[process.env.TOKEN_HEADER_KEY!] as string;
    log('[isAdminMiddleware]: extracting user data from access token');
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, email: string };
    if (email !== 'admin@financeapp.com') {
      log(`[isAdminMiddleware]: YOU ARE NOT THE ADMIN GET OFF!`);
      return res.status(401).json({message: 'YOU ARE NOT THE ADMIN GET OFF!'});
    }
    log(`[isAdminMiddleware]: user ${id} is the LORD OF ALL THINGS`);
    res.locals.user = {
      id
    };
    return next();
  } catch (err) {
    log(`[isAdminMiddleware]: ${err}`);
    const error = {
      message: 'invalid authorization token'
    };
    res.status(401).json(error);
  }
};

export default isAdminMiddleware;
