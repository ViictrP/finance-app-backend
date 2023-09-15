import { RuntimeError } from './custom.error';
import { ErrorType } from './error.type';

export class NotFoundError extends RuntimeError {
 constructor(message: string) {
   super(message, ErrorType.NOT_FOUND_ERROR);
 }
}
