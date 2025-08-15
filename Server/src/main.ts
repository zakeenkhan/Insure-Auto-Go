import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    
    // Enable CORS with more permissive settings for Vercel
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
      exposedHeaders: 'Authorization',
      credentials: true,
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

    // Global interceptors
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    
    // Enable request logging in development
    if (nodeEnv !== 'production') {
      app.use((req: Request, res: Response, next: Function) => {
        logger.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
      });
    }
    
    // Health check endpoint will be handled by a dedicated controller
    // The controller is registered in AppModule

    // Global error handler for unhandled routes
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: `Cannot ${req.method} ${req.path}`,
        error: 'Not Found',
        path: req.path,
        timestamp: new Date().toISOString(),
        url: req.url,
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
      // For Vercel, initialize the app but don't start the server
      await app.init();
      logger.log('🚀 Serverless function ready');
      // The server will be started by the Vercel serverless function
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
