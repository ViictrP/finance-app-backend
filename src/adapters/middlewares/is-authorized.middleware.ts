import { NextFunction, Request, Response } from 'express';
import { log } from '../../core/logger/logger';
import jwt from 'jsonwebtoken';

const isAuthorizedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers } = req;
    log('[isAuthorizedMiddleware]: verifying if user is authorized');
    const token = headers[process.env.TOKEN_HEADER_KEY!] as string;
    log('[isAuthorizedMiddleware]: extracting user data from access token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    log(`[isAuthorizedMiddleware]: user ${id} is authorized`);
    res.locals.user = {
      id
    };
    return next();
  } catch (err) {
    log(`[isAuthorizedMiddleware]: ${err}`);
    const error = {
      message: 'invalid authorization token'
    };
    res.status(401).json(error);
  }
};

export default isAuthorizedMiddleware;
