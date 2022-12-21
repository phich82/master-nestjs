import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiResponse } from '@/shared';

@Catch()
export class AppException implements ExceptionFilter {

  private readonly logger: Logger = new Logger(AppException.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    const httpStatus = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const erroreMessage = exception?.message || 'Unknown error';

    const dataTrack = {
      url: request.url,
      method: request.method,
      params: request.params,
      query: request.query,
      body: request.body,
      error: erroreMessage,
    };

    this.logger.error(dataTrack);

    const responseBody = new ApiResponse().error(erroreMessage, httpStatus);

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
