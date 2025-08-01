import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
