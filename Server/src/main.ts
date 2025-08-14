import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  
  // access Env here
  const configService: ConfigService = new ConfigService();
  // swagger Api Documentation Setup
  if (configService.get<string>('NODE_ENV') != 'production') {
    const config = new DocumentBuilder()
      .setTitle('Insure-Auto-go')
      .addBearerAuth()
      .setDescription('Insure-Auto-go Basic Services')
      .setExternalDoc('Postman Collection', '/api-json')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  await app.listen(5555);
}
bootstrap();
