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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const common_selectors_constant_1 = require("../utils/constants/common-selectors.constant");
const moment = require("moment");
let BookingService = class BookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookingDto) {
        return await this.prisma.booking.create({
            data: createBookingDto,
            include: common_selectors_constant_1.BookingDefaultSelectors,
        });
    }
    async findAll(getBookingDto) {
        const where = { AND: [] };
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
        if (getBookingDto?.carId)
            where['AND'].push({ carId: getBookingDto.carId });
        if (getBookingDto?.driverId)
            where['AND'].push({ driverId: getBookingDto.driverId });
        if (Object.prototype.hasOwnProperty.call(getBookingDto, 'isPaid'))
            where['AND'].push({ isPaid: getBookingDto.isPaid });
        const [bookings, count] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                include: common_selectors_constant_1.BookingDefaultSelectors,
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
    async findOne(id) {
        return await this.prisma.booking.findUnique({
            where: { id },
            include: common_selectors_constant_1.BookingDefaultSelectors,
        });
    }
    async update(userId, id, updateBookingDto) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.clientId !== userId)
            throw new common_1.ForbiddenException('You are not allowed to update this booking');
        return await this.prisma.booking.update({
            where: { id },
            data: updateBookingDto,
            include: common_selectors_constant_1.BookingDefaultSelectors,
        });
    }
    async cancel(user, id) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (user.role !== 'admin' && (booking.clientId !== user.id || booking.carId === user.carId))
            throw new common_1.ForbiddenException('You are not allowed to cancel this booking');
        if (booking.status == client_1.BookingStatus.Cancelled || booking.status == client_1.BookingStatus.Completed || booking.status == client_1.BookingStatus.Reject)
            throw new common_1.BadRequestException(`cannot update booking with status ${booking.status} `);
        return await this.prisma.booking.update({ where: { id }, data: { status: client_1.BookingStatus.Cancelled,
                cancelledAt: moment().utcOffset('+05:00').toDate(),
                cancelledById: user.id
            }, include: common_selectors_constant_1.BookingDefaultSelectors });
    }
    async changeStatus(id, updateBookingDto, user) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.status == client_1.BookingStatus.Cancelled ||
            booking.status == client_1.BookingStatus.Completed ||
            booking.status == client_1.BookingStatus.Reject)
            throw new common_1.BadRequestException(`cannot update booking with status ${booking.status} `);
        if (updateBookingDto.status == client_1.BookingStatus.Cancelled) {
            updateBookingDto['cancelledAt'] = moment().utcOffset('+05:00').toDate();
            updateBookingDto['cancelledById'] = user.id;
        }
        return await this.prisma.booking.update({
            where: { id },
            data: { ...updateBookingDto },
            include: common_selectors_constant_1.BookingDefaultSelectors,
        });
    }
    async checkCarAvailability(carId, startDate, endDate) {
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
                            in: [client_1.BookingStatus.Pending, client_1.BookingStatus.Confirmed],
                        },
                    },
                ],
            },
            orderBy: {
                startDate: 'asc',
            },
        });
        if (bookings.length > 0)
            return { available: false, bookings };
        return { available: true, bookings: [] };
    }
    async checkDriverAvailability(driverId, startDate, endDate) {
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
                            in: [client_1.BookingStatus.Pending, client_1.BookingStatus.Confirmed],
                        },
                    },
                ],
            },
            orderBy: {
                startDate: 'asc',
            },
        });
        if (bookings.length > 0)
            return { available: false, bookings };
        return { available: true, bookings: [] };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map