import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Decorator that applies JWT authentication guard
 * Use this on protected endpoints that require authentication
 */
export function JwtAuth() {
  return applyDecorators(UseGuards(AuthGuard()));
}
