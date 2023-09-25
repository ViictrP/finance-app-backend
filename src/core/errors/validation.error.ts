import { RuntimeError } from './custom.error';
import { ErrorType } from './error.type';

export default class ValidationError extends RuntimeError {
  constructor(message: string) {
    super(message, ErrorType.VALIDATION_ERROR);
  }
}
