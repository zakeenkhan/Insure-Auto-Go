import { Module } from '@nestjs/common';
import {  DriverBookingService} from './driverBooking.service';
import { DriverBookingController } from './driverBooking.controller';

@Module({
  controllers: [DriverBookingController],
  providers: [DriverBookingService],
})
export class DriverBookingModule {}
