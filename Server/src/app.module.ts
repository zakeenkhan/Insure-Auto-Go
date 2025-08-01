import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserSeederService } from './userSeeder.service';
import { CarModule } from './car/car.module';
import { BookingModule } from './booking/booking.module';
import { DriverModule } from './driver/driver.module';
import { RatingModule } from './rating/rating.module';
import { ResponseInterceptor } from './utils/global-interceptors/response.interceptor';
import { GlobalExceptionFilter } from './utils/global-interceptors/global-exception-filter.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { DriverBookingModule } from './driverBooking/driverBooking.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // adjust the path as necessary
      serveRoot: '/uploads', // URL path where files will be served
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UploadImageModule,
    CarModule,
    BookingModule,
    DriverModule,
    RatingModule,
    UserModule,
    DriverBookingModule,
    ConversationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserSeederService,

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
