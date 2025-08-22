/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request } from 'express';
import { AppLoggerService } from '../services/logger.service';
import { throwError } from 'rxjs';

@Injectable()
export class AuthLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext('AuthLoggerInterceptor');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl, ip, headers, body } = request;
    const userAgent = headers['user-agent'] || 'unknown';
    const startTime = Date.now();
    const user = (request as any).user;

    // Extract authentication context
    const getAuthContext = () => ({
      requestId: (request as any).requestId,
      ip,
      userAgent,
      endpoint: originalUrl,
      method,
      email: body?.email || user?.email,
      userId: user?._id || user?.id,
    });

    // Log authentication attempt
    if (originalUrl.includes('/auth/')) {
      const authAction = this.getAuthAction(originalUrl, method);
      this.logger.logAuthEvent(
        `Authentication attempt: ${authAction}`,
        getAuthContext(),
      );
    }

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - startTime;
        const authContext = getAuthContext();

        // Log successful authentication events
        if (originalUrl.includes('/auth/')) {
          const authAction = this.getAuthAction(originalUrl, method);

          switch (authAction) {
            case 'signup':
              this.logger.logAuthEvent('User registration successful', {
                ...authContext,
                duration,
                userId: response?.token ? 'new_user' : authContext.userId,
              });
              break;

            case 'login':
              this.logger.logAuthEvent('User login successful', {
                ...authContext,
                duration,
                hasToken: !!response?.token,
              });
              break;

            case 'logout':
              this.logger.logAuthEvent('User logout successful', {
                ...authContext,
                duration,
              });
              break;

            case 'profile':
              this.logger.logAuthEvent('Profile access successful', {
                ...authContext,
                duration,
              });
              break;
          }
        }

        // Log performance for auth operations
        if (originalUrl.includes('/auth/') && duration > 500) {
          this.logger.logPerformance(
            `Slow auth operation: ${originalUrl}`,
            duration,
            authContext,
          );
        }
      }),
      catchError((error: any) => {
        const duration = Date.now() - startTime;
        const authContext = getAuthContext();

        // Log authentication failures
        if (originalUrl.includes('/auth/')) {
          const authAction = this.getAuthAction(originalUrl, method);

          this.logger.logAuthError(
            `Authentication failed: ${authAction}`,
            error,
            {
              ...authContext,
              duration,
              errorType: error.name,
              statusCode: error.status || 500,
            },
          );

          // Log security events for repeated failures
          if (error.status === 401 || error.status === 403) {
            this.logger.logSecurityEvent(
              `Failed authentication attempt: ${authAction}`,
              this.getSecuritySeverity(authAction, error.status),
              authContext,
            );
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return throwError(() => error);
      }),
    );
  }

  private getAuthAction(url: string, method: string): string {
    if (url.includes('/signup')) return 'signup';
    if (url.includes('/login')) return 'login';
    if (url.includes('/logout')) return 'logout';
    if (url.includes('/profile')) return 'profile';
    return `${method.toLowerCase()}_${url.split('/').pop()}`;
  }

  private getSecuritySeverity(
    authAction: string,
    statusCode: number,
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (authAction === 'login' && statusCode === 401) return 'medium';
    if (authAction === 'signup' && statusCode === 409) return 'low';
    if (authAction === 'profile' && statusCode === 401) return 'high';
    return 'medium';
  }
}
