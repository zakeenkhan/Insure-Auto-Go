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
exports.UserSeederService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const config_1 = require("@nestjs/config");
const argon = require("argon2");
const client_1 = require("@prisma/client");
let UserSeederService = class UserSeederService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async onModuleInit() {
        await this.seedUsers();
    }
    async seedUsers() {
        const usersCount = await this.prisma.user.count();
        if (usersCount === 0) {
            const password = await argon.hash(this.config.get('ADMIN_PASSWORD'));
            const admin = await this.prisma.user.create({
                data: {
                    cnic: this.config.get('ADMIN_CNIC') || '12345-1234567-1',
                    password: password,
                    email: this.config.get('ADMIN_EMAIL') || 'admin@example.com',
                    role: 'admin',
                    isVerified: true,
                    isSignUpVerified: true,
                    fullName: 'Admin User',
                    phone: '03001234567',
                },
            });
            const user1 = await this.prisma.user.create({
                data: {
                    email: 'user1@example.com',
                    password: await argon.hash('Password123!'),
                    role: 'appUser',
                    isVerified: true,
                    isSignUpVerified: true,
                    fullName: 'John Doe',
                    phone: '03001230001',
                },
            });
            const user2 = await this.prisma.user.create({
                data: {
                    email: 'user2@example.com',
                    password: await argon.hash('Password123!'),
                    role: 'appUser',
                    isVerified: true,
                    isSignUpVerified: true,
                    fullName: 'Jane Smith',
                    phone: '03001230002',
                },
            });
            const driverUser = await this.prisma.user.create({
                data: {
                    email: 'driver1@example.com',
                    password: await argon.hash('Password123!'),
                    role: 'appUser',
                    isVerified: true,
                    isSignUpVerified: true,
                    fullName: 'Alex Driver',
                    phone: '03001230003',
                },
            });
            const driver = await this.prisma.driver.create({
                data: {
                    userId: driverUser.id,
                    licenseNo: 'LIC-' + Date.now(),
                    licenseExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
                    lisenceType: 'Car',
                    driverPicture: null,
                    averageRating: new client_1.Prisma.Decimal(4.5),
                    ratingCount: 2,
                    per12HoursRate: 800,
                    city: 'Karachi',
                },
            });
            const car1 = await this.prisma.car.create({
                data: {
                    name: 'Civic',
                    ownerId: user1.id,
                    carPicture: null,
                    city: 'Karachi',
                    registrationNo: 'REG-' + (Date.now() % 1000000),
                    type: 'Sedan',
                    makeYear: '2021',
                    capacity: 5,
                    Make: 'Honda',
                    fuelType: 'Petrol',
                    insured: true,
                    rentPerDay: 6000,
                    insuranceRequired: false,
                    carTransmission: 'Automatic',
                    averageRating: new client_1.Prisma.Decimal(4.0),
                    ratingCount: 2,
                    weightage: new client_1.Prisma.Decimal(0),
                },
            });
            const car2 = await this.prisma.car.create({
                data: {
                    name: 'Corolla',
                    ownerId: user2.id,
                    carPicture: null,
                    city: 'Lahore',
                    registrationNo: 'REG-' + ((Date.now() + 1) % 1000000),
                    type: 'Sedan',
                    makeYear: '2020',
                    capacity: 5,
                    Make: 'Toyota',
                    fuelType: 'Hybrid',
                    insured: false,
                    rentPerDay: 5500,
                    insuranceRequired: false,
                    carTransmission: 'Manual',
                    averageRating: new client_1.Prisma.Decimal(4.2),
                    ratingCount: 3,
                    weightage: new client_1.Prisma.Decimal(0),
                },
            });
            const booking1 = await this.prisma.booking.create({
                data: {
                    clientId: user1.id,
                    carId: car2.id,
                    driverId: driver.id,
                    status: 'Confirmed',
                    isInsured: false,
                    bookingDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    totalPrice: 18000,
                    isPaid: true,
                    amountPaid: 18000,
                    clientContactNo: '03001230001',
                },
            });
            const booking2 = await this.prisma.booking.create({
                data: {
                    clientId: user2.id,
                    carId: car1.id,
                    driverId: null,
                    status: 'Pending',
                    isInsured: true,
                    insurance: 'AAA',
                    bookingDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    totalPrice: 12000,
                    isPaid: false,
                    clientContactNo: '03001230002',
                },
            });
            await this.prisma.rating.createMany({
                data: [
                    {
                        ratedById: user1.id,
                        driverId: driver.id,
                        bookingId: booking1.id,
                        carId: car2.id,
                        rating: new client_1.Prisma.Decimal(5),
                        review: 'Excellent ride!',
                    },
                    {
                        ratedById: user2.id,
                        driverId: null,
                        bookingId: booking2.id,
                        carId: car1.id,
                        rating: new client_1.Prisma.Decimal(4),
                        review: 'Good car, smooth experience.',
                    },
                ],
            });
            await this.prisma.conversation.create({
                data: {
                    userId: user1.id,
                    driverId: driverUser.id,
                    messages: {
                        create: [
                            {
                                senderId: user1.id,
                                receiverId: driverUser.id,
                                isSeen: false,
                                content: 'Hi, are you available tomorrow?'
                            },
                            {
                                senderId: driverUser.id,
                                receiverId: user1.id,
                                isSeen: false,
                                content: 'Yes, I am available after 10am.'
                            },
                        ],
                    },
                },
            });
        }
    }
};
exports.UserSeederService = UserSeederService;
exports.UserSeederService = UserSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UserSeederService);
//# sourceMappingURL=userSeeder.service.js.map