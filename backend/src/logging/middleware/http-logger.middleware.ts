import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLoggerService } from '../services/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext('HttpLoggerMiddleware');
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Generate unique request ID
    const requestId = uuidv4();
    (req as any).requestId = requestId;
    (req as any).startTime = Date.now();

    // Extract request context
    const { method, originalUrl, ip, headers } = req;
    const userAgent = headers['user-agent'] || 'unknown';
    const user = (req as any).user;

    // Log incoming request
    this.logger.logRequest(method, originalUrl, {
      requestId,
      ip,
      userAgent,
      contentLength: headers['content-length'],
      referer: headers.referer,
      userId: user?._id || user?.id,
      email: user?.email,
    });

    // Override res.end to log response
    const originalEnd = res.end.bind(res);

    res.end = ((chunk?: any, encoding?: any, cb?: () => void) => {
      const duration = Date.now() - ((req as any).startTime || Date.now());
      const { statusCode } = res;

      // Log response
      this.logger.logResponse(method, originalUrl, statusCode, duration, {
        requestId,
        ip,
        userAgent,
        userId: user?._id || user?.id,
        email: user?.email,
        responseSize: res.get('content-length'),
      });

      // Log performance if request is slow
      if (duration > 1000) {
        this.logger.logPerformance(
          `Slow request: ${method} ${originalUrl}`,
          duration,
          {
            requestId,
            statusCode,
            ip,
            userId: user?._id || user?.id,
          },
        );
      }

      // Log potential security issues
      if (statusCode === 401 || statusCode === 403) {
        this.logger.logSecurityEvent(
          `Unauthorized access attempt: ${method} ${originalUrl}`,
          'medium',
          {
            requestId,
            ip,
            userAgent,
            statusCode,
          },
        );
      }

      // Call original end method
      return originalEnd(chunk, encoding, cb) as Response;
    }) as typeof res.end;

    next();
  }
}
