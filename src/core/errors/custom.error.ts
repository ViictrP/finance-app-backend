import { ErrorType } from './error.type';

export class RuntimeError extends Error {
  constructor(readonly message: string, readonly status: ErrorType) {
    super(message);
  }
}
