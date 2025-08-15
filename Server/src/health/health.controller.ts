import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(['/api', '/api/health', '/health', '/'])
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({ 
    status: 200, 
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        message: { type: 'string', example: 'Application is healthy' },
        database: { 
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            database: { type: 'string', example: 'connected' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        timestamp: { type: 'string', format: 'date-time' },
        environment: { type: 'string', example: 'development' },
        version: { type: 'string', example: '1.0.0' },
        uptime: { type: 'number', example: 123.45 }
      }
    }
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Service unavailable',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Service unavailable' },
        database: { 
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            database: { type: 'string', example: 'disconnected' },
            error: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        timestamp: { type: 'string', format: 'date-time' },
        environment: { type: 'string', example: 'development' },
        version: { type: 'string', example: '1.0.0' },
        uptime: { type: 'number', example: 123.45 }
      }
    }
  })
  async checkHealth(@Res() res: Response) {
    try {
      const dbHealth = await this.prisma.checkHealth();
      const isHealthy = dbHealth.status === 'ok';
      const status = isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;
      
      const response = {
        status: isHealthy ? 'ok' : 'error',
        message: isHealthy ? 'Application is healthy' : 'Service unavailable',
        database: dbHealth,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        uptime: process.uptime()
      };

      return res.status(status).json(response);
    } catch (error) {
      console.error('Health check failed:', error);
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: 'error',
        message: 'Health check failed',
        error: error.message,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        uptime: process.uptime()
      });
    }
  }
}
