import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import {
  AuthResponseDto,
  ProfileResponseDto,
  LogoutResponseDto,
} from './dto/auth-response.dto';
import { User } from './schemas/user.schema';
import { GetUser } from './get-user.decorator';
import { JwtAuth } from './decorators/auth-guards.decorator';
import {
  ApiSignUp,
  ApiLogin,
  ApiProfile,
  ApiLogout,
} from './decorators/auth-swagger.decorator';
import { AUTH_MESSAGES } from './constants/auth.constants';
import { AuthLoggerInterceptor } from '../logging/interceptors/auth-logger.interceptor';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(AuthLoggerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiSignUp()
  signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiLogin()
  login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @JwtAuth()
  @ApiProfile()
  getProfile(@GetUser() user: User): ProfileResponseDto {
    return {
      user,
      message: AUTH_MESSAGES.WELCOME,
    };
  }

  @Post('logout')
  @JwtAuth()
  @ApiLogout()
  logout(): LogoutResponseDto {
    return {
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
      statusCode: 200,
    };
  }
}
