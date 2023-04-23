import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/middleware/all-exception.filter';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const { httpAdapter } = app.get(HttpAdapterHost);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
