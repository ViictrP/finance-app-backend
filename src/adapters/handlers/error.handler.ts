import { NextFunction, Request, Response } from 'express';
import { RuntimeError } from '../../core/errors/custom.error';

const defaultError = 'Internal Server Error';

const errorHandler = (err: RuntimeError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
    .send(err.message || defaultError);
};

export default errorHandler;
