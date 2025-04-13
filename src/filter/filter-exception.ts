import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const isHttp = exception instanceof HttpException;
    const isError = exception instanceof Error;

    const status: HttpStatus = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Unknown error';
    let error: string = 'Unexpected error';

    if (isHttp) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as { message?: string | string[]; error?: string };
        message = resObj.message ?? message;
        error = resObj.error ?? error;
      }
    } else if (isError) {
      message = exception.message;
      error = exception.stack ?? error;
    }

    const errorResponse = {
      title:
        status === HttpStatus.UNPROCESSABLE_ENTITY
          ? 'Validation Failed'
          : 'An error occurred',
      type: isError ? exception.name : 'UnknownException',
      message,
      error,
      statusCode: status,
    };

    response.status(status).send(errorResponse);
  }
}
