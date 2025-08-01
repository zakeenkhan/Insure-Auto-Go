import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetUserDto) {
    const where: Prisma.UserWhereInput = {};
    if (query?.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { cnic: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      this.prisma.user.count({
        where,
      }),
    ]);
    return {
      data: users,
      meta: {
        totalPages: Math.ceil(count / query.pageSize),
        totalRecords: count,
        currentPage: query.page,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        cnic: true,
        role: true,
        profilePicture: true,
        isVerified: true,
        ratingCount: true,
        averageRatingGiven: true,
        driver: {
          include: {
            bookings: {
              include: {
                cancelledBy: {
                  select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isVerified: true,
                    cnic: true,
                    role: true,
                    profilePicture: true,
                  },
                },
                car: true,
                driver: true,
                ratings: {
                  include: {
                    ratedBy: {
                      select: {
                        id: true,
                        fullName: true,
                        email: true,
                        isVerified: true,
                        cnic: true,
                        role: true,
                        profilePicture: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                bookingDate: 'desc',
              },
            },
          },
        },
        bookings: {
          include: {
            car: true,
            driver: true,
            client: {
              select: {
                id: true,
                fullName: true,
                email: true,
                isVerified: true,
                cnic: true,
                role: true,
                profilePicture: true,
              },
            },
            cancelledBy: {
              select: {
                id: true,
                fullName: true,
                email: true,
                isVerified: true,
                cnic: true,
                role: true,
                profilePicture: true,
              },
            },
            ratings: {
              include: {
                ratedBy: {
                  select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isVerified: true,
                    cnic: true,
                    role: true,
                    profilePicture: true,
                  },
                },
              },
            },
          },
          orderBy: {
            bookingDate: 'desc',
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
