import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth(): object {
    return {
      status: 'ok',
      message: 'EasyGenerator Authentication API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('health')
  getHealthCheck(): object {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
} 