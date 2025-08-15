import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async checkHealth() {
    const dbHealth = await this.prisma.checkHealth();
    const status = dbHealth.status === 'ok' ? 200 : 503;
    
    return {
      status,
      message: status === 200 ? 'Application is healthy' : 'Service unavailable',
      timestamp: new Date().toISOString(),
      database: dbHealth,
    };
  }
}
