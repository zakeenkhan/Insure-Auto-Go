"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const common_selectors_constant_1 = require("../utils/constants/common-selectors.constant");
const moment = require("moment");
let CarService = class CarService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCarDto) {
        const duplicateCar = await this.prisma.car.findFirst({
            where: {
                registrationNo: createCarDto.registrationNo,
            },
        });
        if (duplicateCar) {
            throw new common_1.HttpException({ message: 'Car with this registration number already exists' }, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.car.create({
            data: {
                ...createCarDto,
            },
            include: common_selectors_constant_1.CarDefaultSelectors,
        });
    }
    async findAll(query) {
        const where = { AND: [] };
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
                                in: [client_1.BookingStatus.Pending, client_1.BookingStatus.Confirmed],
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
            }
            else {
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
                include: common_selectors_constant_1.CarDefaultSelectors,
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
    async findOne(id) {
        return await this.prisma.car.findUnique({
            where: {
                id: id,
            },
            include: common_selectors_constant_1.CarDefaultSelectors,
        });
    }
    async update(userId, id, updateCarDto) {
        const car = await this.prisma.car.findUnique({
            where: {
                id: id,
            },
        });
        if (!car) {
            throw new common_1.HttpException({ message: 'Car not found' }, common_1.HttpStatus.NOT_FOUND);
        }
        if (car.ownerId !== userId) {
            throw new common_1.HttpException({ message: 'You are not authorized to update this car' }, common_1.HttpStatus.FORBIDDEN);
        }
        return await this.prisma.car.update({
            where: {
                id: id,
            },
            data: updateCarDto,
            include: common_selectors_constant_1.CarDefaultSelectors,
        });
    }
    remove(id) {
        return `This action removes a #${id} car`;
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarService);
//# sourceMappingURL=car.service.js.map