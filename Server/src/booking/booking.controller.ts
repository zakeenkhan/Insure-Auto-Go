import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isVerifiedUserGuard, JwtAuthGuard } from 'src/guards';
import { GetBookingDto } from './dto/get-booking.dto';
import { BookingStatus } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
  async create(@Request() req, @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.id;
    const [carAvailability, driverAvailability] = await Promise.all([
      this.bookingService.checkCarAvailability(
        createBookingDto.carId,
        createBookingDto.startDate,
        createBookingDto.endDate,
      ),
      this.bookingService.checkDriverAvailability(
        createBookingDto.driverId,
        createBookingDto.startDate,
        createBookingDto.endDate,
      ),
    ]);

    if (!carAvailability.available) {
      throw new BadRequestException('Car is not available', {
        cause: carAvailability.bookings,
      });
    }

    // if (!driverAvailability.available) {
    //   throw new BadRequestException('Driver is not available', { cause: driverAvailability.bookings });
    // }
    return this.bookingService.create({
      clientId: userId,
      ...createBookingDto,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
  findAll(@Query() getBookingDto: GetBookingDto) {
    return this.bookingService.findAll(getBookingDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  @Patch('cancel/:id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
  cancelBooking(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.bookingService.cancel(req.user, id);
  }

  @ApiTags('Admin')
  @Patch('status/:id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
  changeBookingStatus(@Param('id', ParseIntPipe) id: number, @Body() body : UpdateBookingDto, @Request() req) {

    return this.bookingService.changeStatus(id, body, req.user);
  }
  // @Patch(':id')
  // update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() updateBookingDto: UpdateBookingDto) {
  //   const userId = req.user.id;
  //   return this.bookingService.update(userId, id, updateBookingDto);
  // }
}
