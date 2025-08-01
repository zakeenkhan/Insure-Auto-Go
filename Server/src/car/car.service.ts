import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus, Prisma } from '@prisma/client';
import { GetCarDto } from './dto/get-car.dto';
import { CarDefaultSelectors } from 'src/utils/constants/common-selectors.constant';
import * as moment from 'moment';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async create(createCarDto: Prisma.CarUncheckedCreateInput) {
    const duplicateCar = await this.prisma.car.findFirst({
      where: {
        registrationNo: createCarDto.registrationNo,
      },
    });
    if (duplicateCar) {
      throw new HttpException(
        { message: 'Car with this registration number already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.car.create({
      data: {
        ...createCarDto,
      },
      include: CarDefaultSelectors,
    });
  }

  async findAll(query: GetCarDto) {
    const where: any = { AND: [] };
    if (query?.search) {
      where.AND.push({
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { registrationNo: { contains: query.search, mode: 'insensitive' } },
          { Make: { contains: query.search, mode: 'insensitive' } },
          { city: { contains: query.search, mode: 'insensitive' } },
        ],
      });
    }
    if (query?.make) {
      where.AND.push({ Make: { contains: query.make, mode: 'insensitive' } });
    }
    if (query?.city) {
      where.AND.push({ city: { contains: query.city, mode: 'insensitive' } });
    }
    if (query?.ownerId) {
      where.AND.push({ ownerId: query.ownerId });
    }
    if (query?.carTransmission) {
      where.AND.push({ carTransmission: query.carTransmission });
    }
    if (query?.fuelType) {
      where.AND.push({ fuelType: query.fuelType });
    }

    if (Object.prototype.hasOwnProperty.call(query, 'isAvailable')) {
      const bookings = await this.prisma.booking.findMany({
        where: {
          AND: [
            {
              startDate: {
                lte: query?.endDate
                  ? query.endDate
                  : moment()
                      .utc()
                      .set({ hour: 19, minute: 0, second: 0, millisecond: 0 })
                      .toDate(),
              },
            },
            {
              endDate: {
                gte: query?.startDate
                  ? query.startDate
                  : moment()
                      .utc()
                      .subtract(1, 'day')
                      .set({ hour: 19, minute: 0, second: 0, millisecond: 0 })
                      .toDate(),
              },
            },
            {
              status: {
                in: [BookingStatus.Pending, BookingStatus.Confirmed],
              },
            },
          ],
        },
      });

      if (query.isAvailable == true) {
        where.AND.push({
          id: {
            notIn: bookings.map((booking) => booking.carId),
          },
        });
      } else {
        where.AND.push({
          id: {
            in: bookings.map((booking) => booking.carId),
          },
        });
      }
    }

    const [cars, count] = await Promise.all([
      this.prisma.car.findMany({
        where,
        include: CarDefaultSelectors,
        take: query.pageSize,
        skip: (query.page - 1) * query.pageSize,
        orderBy: {
          weightage: 'desc',
        },
      }),
      this.prisma.car.count({
        where,
      }),
    ]);

    return {
      data: cars,
      meta: {
        totalPages: Math.ceil(count / query.pageSize),
        totalRecords: count,
        currentPage: query.page,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.car.findUnique({
      where: {
        id: id,
      },
      include: CarDefaultSelectors,
    });
  }

  async update(userId: number, id: number, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });
    if (!car) {
      throw new HttpException(
        { message: 'Car not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (car.ownerId !== userId) {
      throw new HttpException(
        { message: 'You are not authorized to update this car' },
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prisma.car.update({
      where: {
        id: id,
      },
      data: updateCarDto,
      include: CarDefaultSelectors,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
