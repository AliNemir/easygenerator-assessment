export const AUTH_MESSAGES = {
  WELCOME: 'Welcome to the application.',
  LOGOUT_SUCCESS: 'Successfully logged out',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  LOGIN_REQUIRED: 'Login first to access this endpoint.',
} as const;

export const JWT_DEFAULTS = {
  SECRET: 'default-secret-key-for-development',
  EXPIRES_IN: '24h',
} as const;

export const HTTP_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  BAD_REQUEST: 'Bad Request',
  CONFLICT: 'Conflict',
} as const;
