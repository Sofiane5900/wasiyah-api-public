import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<{
      status: (code: number) => any;
      send: (body: unknown) => void;
    }>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isHttp = exception instanceof HttpException;
    const isError = exception instanceof Error;

    const errorBody = isHttp ? exception.getResponse() : null;
    const error =
      errorBody && typeof errorBody === 'object' && 'error' in errorBody
        ? (errorBody as { error: string }).error
        : isError
          ? exception.stack
          : 'Unexpected error';

    const errorResponse = {
      title: isHttp ? 'An error occurred' : 'Internal Server Error',
      type: isError ? exception.name : 'UnknownException',
      message: isError ? exception.message : 'Unknown error',
      error,
      statusCode: status,
    };

    response.status(status).send(errorResponse);
  }
}
