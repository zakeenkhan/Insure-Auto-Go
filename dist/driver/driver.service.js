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
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_selectors_constant_1 = require("../utils/constants/common-selectors.constant");
let DriverService = class DriverService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDriverDto) {
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
            throw new common_1.HttpException({ message: ['User not found'] }, common_1.HttpStatus.NOT_FOUND);
        }
        if (user.driver.length > 0) {
            throw new common_1.HttpException({ message: ['User is already a driver'] }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (duplicateDriver) {
            throw new common_1.HttpException({ message: ['Driver with this license number already exists'] }, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.driver.create({
            data: createDriverDto,
            include: common_selectors_constant_1.DriverDefaultSelectors,
        });
    }
    async findAll(getDriverDto) {
        const where = {
            AND: []
        };
        where.AND.push({ licenseExpiry: {
                gte: new Date(),
            } });
        if (getDriverDto?.search) {
            where.AND.push({
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
        if (getDriverDto?.city) {
            where.AND.push({ city: { contains: getDriverDto.city, mode: 'insensitive' } });
        }
        const [drivers, count] = await Promise.all([
            this.prisma.driver.findMany({
                where,
                include: common_selectors_constant_1.DriverDefaultSelectors,
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
    async findOne(id) {
        const driver = await this.prisma.driver.findUnique({
            where: {
                id: id,
            },
            include: common_selectors_constant_1.DriverDefaultSelectors,
        });
        if (!driver) {
            throw new common_1.HttpException('Driver not found', common_1.HttpStatus.NOT_FOUND);
        }
        return driver;
    }
    async update(userId, id, updateDriverDto, user) {
        const driver = await this.prisma.driver.findUnique({
            where: {
                id: id,
            },
        });
        if (!driver) {
            throw new common_1.NotFoundException('Driver not found');
        }
        if (user.role !== 'admin' && driver.userId !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this driver');
        }
        return await this.prisma.driver.update({
            where: {
                id: id,
            },
            data: updateDriverDto,
            include: common_selectors_constant_1.DriverDefaultSelectors,
        });
    }
    remove(id) {
        return `This action removes a #${id} driver`;
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DriverService);
//# sourceMappingURL=driver.service.js.map