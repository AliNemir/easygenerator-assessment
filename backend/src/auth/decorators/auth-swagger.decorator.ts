import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import {
  AuthResponseDto,
  ProfileResponseDto,
  LogoutResponseDto,
} from '../dto/auth-response.dto';

export function ApiSignUp() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description:
        'Create a new user account with email, name, and password. Returns a JWT token for immediate authentication.',
    }),
    ApiBody({ type: SignUpDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User successfully registered',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation failed - invalid input data',
      schema: {
        example: {
          statusCode: 400,
          message: [
            'email must be a valid email',
            'password must be longer than or equal to 8 characters',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Email already exists',
      schema: {
        example: {
          statusCode: 409,
          message: 'Email already exists',
          error: 'Conflict',
        },
      },
    }),
  );
}

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate user',
      description:
        'Login with email and password. Returns a JWT token for accessing protected endpoints.',
    }),
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User successfully authenticated',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation failed - invalid input data',
      schema: {
        example: {
          statusCode: 400,
          message: [
            'email must be a valid email',
            'password must be longer than or equal to 8 characters',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid credentials',
      schema: {
        example: {
          statusCode: 401,
          message: 'Invalid email or password',
          error: 'Unauthorized',
        },
      },
    }),
  );
}

export function ApiProfile() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({
      summary: 'Get user profile',
      description:
        "Retrieve the authenticated user's profile information. Requires valid JWT token in Authorization header.",
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile retrieved successfully',
      type: ProfileResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Missing or invalid JWT token',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
  );
}

export function ApiLogout() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({
      summary: 'Logout user',
      description:
        'Logout the authenticated user. This invalidates the current session on the client side.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User successfully logged out',
      type: LogoutResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Missing or invalid JWT token',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
  );
}
