import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

export async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
      bufferLogs: true,
    });

    // Get config service
    const configService = app.get(ConfigService);
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');
    const port = configService.get<number>('PORT', 5555);
    
    // Configure CORS for single domain
    const allowedOrigins = [
      'http://localhost:3001',  // Local development
      'https://your-production-domain.com', // Update this with your production domain
    ];
    
    app.enableCors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          logger.warn(`CORS blocked: ${origin}`);
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    
    // Global prefix for API routes
    app.setGlobalPrefix('api');
    
    // Swagger API Documentation (only in non-production)
    if (nodeEnv !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Insure-Auto-go')
        .addBearerAuth()
        .setDescription('Insure-Auto-go Basic Services')
        .setExternalDoc('Postman Collection', '/api-json')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
      logger.log('Swagger documentation available at /api/docs');
    }

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        disableErrorMessages: nodeEnv === 'production',
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Global error handling
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
    });

    // Start the application
    if (process.env.VERCEL !== '1') {
      await app.listen(port);
      logger.log(`Application is running on: http://localhost:${port}`);
      logger.log(`Environment: ${nodeEnv}`);
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
