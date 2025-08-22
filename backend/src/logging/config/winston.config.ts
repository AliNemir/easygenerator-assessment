/* eslint-disable @typescript-eslint/restrict-template-expressions */

import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Custom log format for development (human-readable)
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message, context, trace, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : '';
      const contextString = context ? `[${context as string}]` : '';
      const traceString = trace ? `\n${trace as string}` : '';

      return `${timestamp} ${level} ${contextString} ${message}${traceString}${metaString ? `\n${metaString}` : ''}`;
    },
  ),
);

// Custom log format for production (JSON)
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Console transport
const consoleTransport = new winston.transports.Console({
  format:
    process.env.NODE_ENV === 'production'
      ? productionFormat
      : developmentFormat,
});

// File transport for general logs
const fileTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: productionFormat,
});

// File transport for error logs
const errorFileTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '30d',
  format: productionFormat,
});

// File transport for authentication events
const authFileTransport = new DailyRotateFile({
  filename: 'logs/auth-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d',
  format: productionFormat,
});

// File transport for performance logs
const performanceFileTransport = new DailyRotateFile({
  filename: 'logs/performance-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '7d',
  format: productionFormat,
});

// Main Winston logger configuration
export const winstonConfig: winston.LoggerOptions = {
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: productionFormat,
  defaultMeta: {
    service: 'easygenerator-auth',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [consoleTransport, fileTransport, errorFileTransport],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
};

// Specialized logger configurations
export const authLoggerConfig: winston.LoggerOptions = {
  ...winstonConfig,
  transports: [consoleTransport, authFileTransport],
  defaultMeta: {
    ...winstonConfig.defaultMeta,
    module: 'auth',
  },
};

export const performanceLoggerConfig: winston.LoggerOptions = {
  ...winstonConfig,
  transports: [consoleTransport, performanceFileTransport],
  defaultMeta: {
    ...winstonConfig.defaultMeta,
    module: 'performance',
  },
};
