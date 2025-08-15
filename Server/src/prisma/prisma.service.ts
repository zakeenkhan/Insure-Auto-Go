import { Injectable, OnModuleInit, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

// Extend PrismaClient to include the $on method
declare module '@prisma/client' {
  interface PrismaClient {
    $on(event: 'beforeExit', listener: () => Promise<void>): void;
    $disconnect(): Promise<void>;
  }
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;
  private connectionAttempts = 0;
  private readonly MAX_RETRIES = 5;
  private readonly RETRY_DELAY = 3000; // 3 seconds

  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
      log: ['error', 'warn', 'info'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry() {
    while (this.connectionAttempts < this.MAX_RETRIES && !this.isConnected) {
      try {
        this.logger.log(`Attempting to connect to database (Attempt ${this.connectionAttempts + 1}/${this.MAX_RETRIES})`);
        await this.$connect();
        this.isConnected = true;
        this.logger.log('✅ Database connection established successfully');
        
        // Log database info (without sensitive data)
        const dbInfo = await this.getDatabaseInfo();
        this.logger.log(`📊 Database Info: ${JSON.stringify(dbInfo)}`);
        
        return;
      } catch (error) {
        this.connectionAttempts++;
        this.logger.error(`❌ Database connection attempt ${this.connectionAttempts} failed:`, error.message);
        
        if (this.connectionAttempts < this.MAX_RETRIES) {
          this.logger.log(`Retrying in ${this.RETRY_DELAY / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        } else {
          this.logger.error('❌ Max connection attempts reached. Please check your database configuration.');
          throw error;
        }
      }
    }
  }

  private async getDatabaseInfo() {
    try {
      const [userCount, carCount, bookingCount] = await Promise.all([
        this.user.count(),
        this.car.count(),
        this.booking.count(),
      ]);

      return {
        userCount,
        carCount,
        bookingCount,
        databaseName: this.getDatabaseName(this.config.get('DATABASE_URL')),
        nodeEnv: this.config.get('NODE_ENV', 'development'),
      };
    } catch (error) {
      this.logger.warn('Could not fetch database stats:', error.message);
      return { error: 'Could not fetch database stats' };
    }
  }

  private getDatabaseName(connectionString: string): string {
    try {
      const url = new URL(connectionString);
      return url.pathname.replace(/^\/+/, '');
    } catch (e) {
      return 'unknown';
    }
  }

  private beforeExitListener: (() => Promise<void>) | null = null;

  async enableShutdownHooks(app: any) {
    // Handle process signals for graceful shutdown
    const shutdown = async (signal: string) => {
      this.logger.log(`Received ${signal}. Shutting down gracefully...`);
      try {
        await app.close();
        this.logger.log('Application has been successfully closed');
        process.exit(0);
      } catch (error) {
        this.logger.error('Error during application shutdown:', error);
        process.exit(1);
      }
    };

    // Handle process signals
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle Prisma's beforeExit event
    this.beforeExitListener = async () => {
      this.logger.log('Prisma beforeExit event received. Closing application...');
      await shutdown('beforeExit');
    };

    // Register the beforeExit listener
    this.$on('beforeExit', this.beforeExitListener);
  }

  async checkHealth() {
    try {
      await this.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
