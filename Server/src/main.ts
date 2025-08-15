import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    // Create the application with enhanced logging
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
      bufferLogs: true,
      abortOnError: false, // Don't crash on startup errors
    });

    // Get config service
    const configService = app.get(ConfigService);
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');
    const port = configService.get<number>('PORT', 5555);
    const isVercel = configService.get<string>('VERCEL') === '1';
    
    // Configure CORS for development and production
    const allowedOrigins = [
      'http://localhost:3001',  // Local development
      'http://localhost:3000',  // Common frontend port
      'https://insure-auto-go.vercel.app', // Production frontend
      'https://*.vercel.app',   // Vercel preview deployments
      'https://insure-auto-go.vercel.app', // Production domain
    ];
    
    // Enable CORS with proper error handling
    app.enableCors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin && nodeEnv === 'development') {
          logger.warn('Request with no origin - allowing in development');
          return callback(null, true);
        }
        
        // In production, only allow requests from known origins
        if (nodeEnv === 'production' && origin && !allowedOrigins.some(o => 
          origin === o || 
          origin.endsWith(o.replace('https://', ''))
        )) {
          logger.warn(`CORS blocked: ${origin}`);
          return callback(new Error('Not allowed by CORS'), false);
        }
        
        return callback(null, true);
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
      exposedHeaders: 'Authorization',
      maxAge: 600, // 10 minutes
    });
    
    // Global prefix for API routes
    app.setGlobalPrefix('api');
    
    // Swagger API Documentation (only in non-production)
    if (nodeEnv !== 'production') {
      try {
        const config = new DocumentBuilder()
          .setTitle('Insure-Auto-go API')
          .addBearerAuth()
          .setDescription('API documentation for Insure-Auto-go Services')
          .setExternalDoc('Postman Collection', '/api-json')
          .setVersion('1.0')
          .addServer(`http://localhost:${port}`, 'Local Development')
          .addServer('https://insure-auto-go-api.vercel.app', 'Production')
          .build();
          
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document, {
          customSiteTitle: 'Insure-Auto-go API Docs',
          explorer: true,
        });
        
        logger.log(`🚀 Swagger documentation available at /api/docs`);
      } catch (error) {
        logger.error('Failed to setup Swagger', error);
      }
    }

    // Global validation pipe with enhanced error handling
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: nodeEnv === 'production',
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors) => {
          const formattedErrors = errors.map(error => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
          }));
          
          return new HttpException(
            { 
              statusCode: HttpStatus.BAD_REQUEST, 
              message: 'Validation failed',
              errors: formattedErrors,
              timestamp: new Date().toISOString(),
              path: '',
            },
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    );

    // Global error handling
    process.on('unhandledRejection', (reason) => {
      logger.error('⚠️ Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('⚠️ Uncaught Exception:', error);
      // In production, you might want to restart the process here
      if (nodeEnv === 'production') {
        process.exit(1);
      }
    });

    // Enable shutdown hooks for graceful shutdown
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    // Health check endpoint
    app.get('/', async (req, res) => {
      try {
        // Check database connection
        await prismaService.$queryRaw`SELECT 1`;
        
        res.status(200).json({
          status: 'ok',
          database: 'connected',
          timestamp: new Date().toISOString(),
          environment: nodeEnv,
          version: '1.0.0',
        });
      } catch (error) {
        logger.error('Health check failed:', error);
        res.status(500).json({
          status: 'error',
          database: 'disconnected',
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Global error handler for unhandled routes
    app.use((req, res) => {
      res.status(404).json({
        statusCode: 404,
        message: `Cannot ${req.method} ${req.path}`,
        error: 'Not Found',
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    });

    // Start the application
    if (!isVercel) {
      await app.listen(port);
      logger.log(`🚀 Application is running on: http://localhost:${port}`);
      logger.log(`🌐 Environment: ${nodeEnv}`);
      
      // Log database connection status
      try {
        const health = await prismaService.checkHealth();
        logger.log(`💾 Database Status: ${health.database.toUpperCase()}`);
      } catch (error) {
        logger.error('❌ Failed to connect to database:', error.message);
      }
    } else {
      // For Vercel, we need to start the server but don't await it
      await app.init();
      const server = app.getHttpServer();
      server.listen(0); // Use 0 to let the OS assign an available port
      logger.log('🚀 Serverless function ready');
    }
    
    // Return the app instance for Vercel serverless function
    return app;
  } catch (error) {
    logger.error('Error during application startup', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

bootstrap();
