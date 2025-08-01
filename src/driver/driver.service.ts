import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetDriverDto } from './dto/get-driver.dto';
import { DriverDefaultSelectors } from 'src/utils/constants/common-selectors.constant';
@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  async create(createDriverDto: Prisma.DriverUncheckedCreateInput) {
    const [user, duplicateDriver] = await Promise.all([
      this.prisma.user.findUnique({
        where: {
          id: createDriverDto.userId,
        },
        include: {
          driver: true,
        },
      }),
      this.prisma.driver.findUnique({
        where: {
          licenseNo: createDriverDto.licenseNo,
        },
      }),
    ]);
    if (!user) {
      throw new HttpException(
        { message: ['User not found'] },
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.driver.length > 0) {
      throw new HttpException(
        { message: ['User is already a driver'] },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (duplicateDriver) {
      throw new HttpException(
        { message: ['Driver with this license number already exists'] },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.driver.create({
      data: createDriverDto,
      include: DriverDefaultSelectors,
    });
  }

  async findAll(getDriverDto: GetDriverDto) {
    const where = {
      AND:[]
    };
    where.AND.push({      licenseExpiry: {
      gte: new Date(),
    }})
    if (getDriverDto?.search) {
      where.AND.push(
        {
          OR: [
            {
              user: {
                fullName: {
                  contains: getDriverDto.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              user: {
                email: { contains: getDriverDto.search, mode: 'insensitive' },
              },
            },
            {
              licenseNo: { contains: getDriverDto.search, mode: 'insensitive' },
            },
          ],
        });
    }
    if(getDriverDto?.city){
      where.AND.push ({city: {contains: getDriverDto.city, mode: 'insensitive'}})
    }
    const [drivers, count] = await Promise.all([
      this.prisma.driver.findMany({
        where,
        include: DriverDefaultSelectors,
        take: getDriverDto.pageSize,
        skip: (getDriverDto.page - 1) * getDriverDto.pageSize,
        orderBy: {
          weightage: 'desc',
        },
      }),
      this.prisma.driver.count({
        where,
      }),
    ]);

    return {
      data: drivers,
      meta: {
        totalPages: Math.ceil(count / getDriverDto.pageSize),
        totalRecords: count,
        currentPage: getDriverDto.page,
        pageSize: getDriverDto.pageSize,
      },
    };
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: {
        id: id,
      },
      include: DriverDefaultSelectors,
    });
    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }
    return driver;
  }

  async update(userId: number, id: number, updateDriverDto: UpdateDriverDto, user:any) {
    const driver = await this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    if ( user.role !== 'admin' && driver.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this driver'
      );
    }
    return await this.prisma.driver.update({
      where: {
        id: id,
      },
      data: updateDriverDto,
      include: DriverDefaultSelectors,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
