import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CatsController } from './cats/controller/cats.controller';
import { CatsService } from './cats/service/cats.service';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
