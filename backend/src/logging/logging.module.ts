import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './services/logger.service';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { AuthLoggerInterceptor } from './interceptors/auth-logger.interceptor';

@Global()
@Module({
  providers: [
    AppLoggerService,
    HttpLoggerMiddleware,
    AuthLoggerInterceptor,
  ],
  exports: [
    AppLoggerService,
    HttpLoggerMiddleware,
    AuthLoggerInterceptor,
  ],
})
export class LoggingModule {} 