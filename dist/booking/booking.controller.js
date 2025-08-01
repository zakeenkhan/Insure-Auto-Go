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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
const get_booking_dto_1 = require("./dto/get-booking.dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(req, createBookingDto) {
        const userId = req.user.id;
        const [carAvailability, driverAvailability] = await Promise.all([
            this.bookingService.checkCarAvailability(createBookingDto.carId, createBookingDto.startDate, createBookingDto.endDate),
            this.bookingService.checkDriverAvailability(createBookingDto.driverId, createBookingDto.startDate, createBookingDto.endDate),
        ]);
        if (!carAvailability.available) {
            throw new common_1.BadRequestException('Car is not available', {
                cause: carAvailability.bookings,
            });
        }
        return this.bookingService.create({
            clientId: userId,
            ...createBookingDto,
        });
    }
    findAll(getBookingDto) {
        return this.bookingService.findAll(getBookingDto);
    }
    findOne(id) {
        return this.bookingService.findOne(id);
    }
    cancelBooking(req, id) {
        return this.bookingService.cancel(req.user, id);
    }
    changeBookingStatus(id, body, req) {
        return this.bookingService.changeStatus(id, body, req.user);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_booking_dto_1.GetBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('cancel/:id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "cancelBooking", null);
__decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Patch)('status/:id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_booking_dto_1.UpdateBookingDto, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "changeBookingStatus", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Booking'),
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map