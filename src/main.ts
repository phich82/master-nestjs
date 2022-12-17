import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppException } from './exception/app-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Show logs in console
    logger: ['log', 'error', 'warn', 'debug'],
  });
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AppException(
    app.get(HttpAdapterHost)
  ));
  await app.listen(8000);
}
bootstrap();
