import { RuntimeError } from './custom.error';
import { ErrorType } from './error.type';

export default class RequestError extends RuntimeError {
  constructor(message: string) {
    super(message, ErrorType.INVALID_REQUEST);
  }
}
