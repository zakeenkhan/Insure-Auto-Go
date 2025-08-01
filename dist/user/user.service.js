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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
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
    async findOne(id) {
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
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return await this.prisma.user.update({
            where: { id },
            data: { ...updateUserDto },
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map