import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus, Prisma } from '@prisma/client';
import { GetRatingDto } from './dto/get-rating.dto';
@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRatingDto: CreateRatingDto & { ratedById: number }) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: createRatingDto.bookingId,
      },
      include: {
        ratings: true,
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.status !== BookingStatus.Completed) {
      throw new ForbiddenException('You can only rate completed bookings');
    }
    if (booking.clientId !== createRatingDto.ratedById) {
      throw new ForbiddenException('You are not allowed to rate this booking');
    }
    if (booking.ratings.length > 0) {
      throw new ForbiddenException('You already rated this booking');
    }
    const data = await this.prisma.rating.create({
      data: {
        ...createRatingDto,
        ratedById: booking.clientId,
        driverId: booking.driverId,
        carId: booking.carId,
      },
    });
    this.updateAverageRating(data.ratedById, data.driverId, data.carId);
    return data;
  }

  async findAll(user: any, query: GetRatingDto) {
    const where: Prisma.RatingWhereInput = {};
    if (query?.carId) {
      where.carId = query.carId;
    }
    if (query?.driverId) {
      where.driverId = query.driverId;
    }
    if (query?.bookingId) {
      where.bookingId = query.bookingId;
    }
    if (query?.search) {
      where.OR = [
        {
          car: {
            OR: [
              {
                name: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                Make: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                registrationNo: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
        {
          driver: {
            user: {
              OR: [
                {
                  fullName: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          },
        },
        {
          ratedBy: {
            OR: [
              {
                fullName: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
      ];
    }
    const [ratings, count] = await Promise.all([
      this.prisma.rating.findMany({
        where,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.rating.count({
        where,
      }),
    ]);
    return {
      data: ratings,
      meta: {
        totalPages: Math.ceil(count / query.pageSize),
        totalRecords: count,
        currentPage: query.page,
      },
    };
  }

  async findOne(id: number) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        id,
      },
    });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async update(
    id: number,
    updateRatingDto: UpdateRatingDto & { ratedById: number },
  ) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        id,
      },
    });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    if (rating.ratedById !== updateRatingDto.ratedById) {
      throw new ForbiddenException('You are not allowed to update this rating');
    }
    const data = await this.prisma.rating.update({
      where: {
        id,
      },
      data: updateRatingDto,
    });
    this.updateAverageRating(data.ratedById, data.driverId, data.carId);
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }

  async updateAverageRating(userId: number, driverId: number, carId: number) {
    const [userRatings, driverRatings, carRatings] = await Promise.all([
      this.prisma.rating.aggregate({
        where: {
          ratedById: userId,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      }),
      this.prisma.rating.aggregate({
        where: {
          driverId,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      }),
      this.prisma.rating.aggregate({
        where: {
          carId,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      }),
    ]);

    const userWeight = (
      userRatings._avg.rating.toNumber() * userRatings._count.rating
    ).toFixed(2);
    const driverWeight = (
      driverRatings._avg.rating.toNumber() * driverRatings._count.rating
    ).toFixed(2);
    const carWeight = (
      carRatings._avg.rating.toNumber() * carRatings._count.rating
    ).toFixed(2);
    console.log(userWeight, driverWeight, carWeight);
    await Promise.all([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          averageRatingGiven: userRatings._avg.rating.toNumber().toFixed(2),
          weightage: userWeight,
          ratingCount: userRatings._count.rating ?? 0,
        },
      }),
      this.prisma.driver.update({
        where: {
          id: driverId,
        },
        data: {
          averageRating: driverRatings._avg.rating.toNumber().toFixed(2),
          weightage: driverWeight,
          ratingCount: driverRatings._count.rating ?? 0,
        },
      }),
      this.prisma.car.update({
        where: {
          id: carId,
        },
        data: {
          averageRating: carRatings._avg.rating.toNumber().toFixed(2),
          weightage: carWeight,
          ratingCount: carRatings._count.rating ?? 0,
        },
      }),
    ]);
  }
}
