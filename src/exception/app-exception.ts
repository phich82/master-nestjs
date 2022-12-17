import { ArgumentsHost, Catch, ExceptionFilter, HttpAdapterHost, HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse } from '@/shared';

@Catch()
export class AppException implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const erroreMessage = exception instanceof HttpException ? exception.message : 'Unknown error';

    // const responseBody = {
    //   statusCode: httpStatus,
    //   timestamp: new Date().toISOString(),
    //   path: httpAdapter.getRequestUrl(ctx.getRequest()),
    // };

    // console.log('responseBody => ', responseBody)

    const responseBody = (new ApiResponse()).error(erroreMessage, httpStatus);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
