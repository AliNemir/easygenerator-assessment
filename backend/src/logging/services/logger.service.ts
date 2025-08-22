/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import {
  winstonConfig,
  authLoggerConfig,
  performanceLoggerConfig,
} from '../config/winston.config';

export interface LogContext {
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  requestId?: string;
  duration?: number;
  statusCode?: number;
  method?: string;
  url?: string;
  [key: string]: any;
}

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly authLogger: winston.Logger;
  private readonly performanceLogger: winston.Logger;
  private context?: string;

  constructor() {
    this.logger = winston.createLogger(winstonConfig);
    this.authLogger = winston.createLogger(authLoggerConfig);
    this.performanceLogger = winston.createLogger(performanceLoggerConfig);
  }

  setContext(context: string) {
    this.context = context;
  }

  // Standard NestJS LoggerService methods
  log(message: any, context?: string) {
    this.info(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    const logContext = context || this.context;
    this.logger.error(message, {
      context: logContext,
      trace,
      timestamp: new Date().toISOString(),
    });
  }

  warn(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.warn(message, {
      context: logContext,
      timestamp: new Date().toISOString(),
    });
  }

  debug(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.debug(message, {
      context: logContext,
      timestamp: new Date().toISOString(),
    });
  }

  verbose(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.verbose(message, {
      context: logContext,
      timestamp: new Date().toISOString(),
    });
  }

  // Enhanced logging methods
  info(message: string, context?: string, meta?: LogContext) {
    const logContext = context || this.context;
    this.logger.info(message, {
      context: logContext,
      timestamp: new Date().toISOString(),
      ...meta,
    });
  }

  // Authentication-specific logging
  logAuthEvent(event: string, context: LogContext) {
    this.authLogger.info(event, {
      context: 'AUTH',
      timestamp: new Date().toISOString(),
      event,
      ...context,
    });
  }

  logAuthError(message: string, error: Error, context: LogContext) {
    this.authLogger.error(message, {
      context: 'AUTH',
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      ...context,
    });
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context: LogContext) {
    this.performanceLogger.info(`${operation} completed`, {
      context: 'PERFORMANCE',
      timestamp: new Date().toISOString(),
      operation,
      duration,
      ...context,
    });
  }

  // Request/Response logging
  logRequest(method: string, url: string, context: LogContext) {
    this.logger.info(`Incoming request: ${method} ${url}`, {
      context: 'HTTP',
      timestamp: new Date().toISOString(),
      method,
      url,
      type: 'request',
      ...context,
    });
  }

  logResponse(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    context: LogContext,
  ) {
    const level =
      statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'info';

    this.logger.log(
      level,
      `Response: ${method} ${url} ${statusCode} - ${duration}ms`,
      {
        context: 'HTTP',
        timestamp: new Date().toISOString(),
        method,
        url,
        statusCode,
        duration,
        type: 'response',
        ...context,
      },
    );
  }

  // Error tracking with additional context
  logError(error: Error, context: LogContext, additionalInfo?: any) {
    this.logger.error(error.message, {
      context: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      name: error.name,
      ...context,
      ...additionalInfo,
    });
  }

  // Database operation logging
  logDatabaseOperation(
    operation: string,
    collection: string,
    duration: number,
    context?: LogContext,
  ) {
    this.logger.info(`Database ${operation} on ${collection}`, {
      context: 'DATABASE',
      timestamp: new Date().toISOString(),
      operation,
      collection,
      duration,
      ...context,
    });
  }

  // Security events logging
  logSecurityEvent(
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    context: LogContext,
  ) {
    const level =
      severity === 'critical' || severity === 'high' ? 'error' : 'warn';

    this.logger.log(level, `Security event: ${event}`, {
      context: 'SECURITY',
      timestamp: new Date().toISOString(),
      event,
      severity,
      ...context,
    });
  }
}
