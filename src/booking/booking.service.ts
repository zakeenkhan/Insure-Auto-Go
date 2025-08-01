import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBookingDto } from './dto/get-booking.dto';
import { BookingDefaultSelectors } from '../utils/constants/common-selectors.constant';
import * as moment from 'moment';
@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: Prisma.BookingUncheckedCreateInput) {
    return await this.prisma.booking.create({
      data: createBookingDto,
      include: BookingDefaultSelectors,
    });
  }

  async findAll(getBookingDto: GetBookingDto) {
    const where: any = { AND: [] };

    if (getBookingDto?.search)
      where['AND'] = [
        {
          OR: [
            {
              client: {
                fullName: {
                  contains: getBookingDto.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              client: {
                email: { contains: getBookingDto.search, mode: 'insensitive' },
              },
            },
            {
              car: {
                registrationNo: {
                  contains: getBookingDto.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              driver: {
                user: {
                  fullName: {
                    contains: getBookingDto.search,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        },
      ];
    if (getBookingDto?.status)
      where['AND'].push({ status: getBookingDto.status });
    if (Object.prototype.hasOwnProperty.call(getBookingDto, 'isInsured'))
      where['AND'].push({ isInsured: getBookingDto.isInsured });
    if (getBookingDto?.bookingDate)
      where['AND'].push({ bookingDate: getBookingDto.bookingDate });
    if (getBookingDto?.startDate)
      where['AND'].push({ bookingDate: { gte: getBookingDto.startDate } });
    if (getBookingDto?.endDate)
      where['AND'].push({ bookingDate: { lte: getBookingDto.endDate } });
    if (getBookingDto?.carId) where['AND'].push({ carId: getBookingDto.carId });
    if (getBookingDto?.driverId)
      where['AND'].push({ driverId: getBookingDto.driverId });
    if (Object.prototype.hasOwnProperty.call(getBookingDto, 'isPaid'))
      where['AND'].push({ isPaid: getBookingDto.isPaid });
    const [bookings, count] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        include: BookingDefaultSelectors,
        take: getBookingDto.pageSize,
        skip: (getBookingDto.page - 1) * getBookingDto.pageSize,
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      meta: {
        totalPages: Math.ceil(count / getBookingDto.pageSize),
        totalRecords: count,
        currentPage: getBookingDto.page,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.booking.findUnique({
      where: { id },
      include: BookingDefaultSelectors,
    });
  }

  async update(userId: number, id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.clientId !== userId)
      throw new ForbiddenException(
        'You are not allowed to update this booking',
      );

    return await this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
      include: BookingDefaultSelectors,
    });
  }

async cancel(user: any, id: number) {
  const booking = await this.prisma.booking.findUnique({where:{id}});
  if(!booking) throw new NotFoundException('Booking not found');
  if( user.role !== 'admin' && ( booking.clientId !== user.id || booking.carId === user.carId) ) throw new ForbiddenException('You are not allowed to cancel this booking');
  if (booking.status == BookingStatus.Cancelled || booking.status == BookingStatus.Completed || booking.status == BookingStatus.Reject) 
    throw new BadRequestException(`cannot update booking with status ${booking.status} `);
  return await this.prisma.booking.update({where:{id},data:{status:BookingStatus.Cancelled,
    cancelledAt: moment().utcOffset('+05:00').toDate(),
    cancelledById:user.id
  },   include:BookingDefaultSelectors });
}

  async changeStatus(
    id: number,
    updateBookingDto: UpdateBookingDto,
    user: any,
  ) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    if (
      booking.status == BookingStatus.Cancelled ||
      booking.status == BookingStatus.Completed ||
      booking.status == BookingStatus.Reject
    )
      throw new BadRequestException(
        `cannot update booking with status ${booking.status} `,
      );
    if (updateBookingDto.status == BookingStatus.Cancelled) {
      updateBookingDto['cancelledAt'] = moment().utcOffset('+05:00').toDate();
      updateBookingDto['cancelledById'] = user.id;
    }
    return await this.prisma.booking.update({
      where: { id },
      data: { ...updateBookingDto },
      include: BookingDefaultSelectors,
    });
  }

  async checkCarAvailability(carId: number, startDate: Date, endDate: Date) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        AND: [
          {
            carId: carId,
          },

          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
          {
            status: {
              in: [BookingStatus.Pending, BookingStatus.Confirmed],
            },
          },
        ],
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    if (bookings.length > 0) return { available: false, bookings };
    return { available: true, bookings: [] };
  }

  async checkDriverAvailability(
    driverId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        AND: [
          {
            driverId: driverId,
          },

          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
          {
            status: {
              in: [BookingStatus.Pending, BookingStatus.Confirmed],
            },
          },
        ],
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    if (bookings.length > 0) return { available: false, bookings };
    return { available: true, bookings: [] };
  }
}
