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
exports.GetBookingDto = void 0;
const pagination_dto_1 = require("../../utils/dto/pagination.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class GetBookingDto extends pagination_dto_1.PaginationDto {
}
exports.GetBookingDto = GetBookingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search for cars by name, model, or Registration Number',
        example: 'Toyota Corolla',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetBookingDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Pending', enum: client_1.BookingStatus }),
    (0, class_validator_1.IsEnum)(client_1.BookingStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBookingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetBookingDto.prototype, "isInsured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: new Date() }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        date.setHours(5, 0, 0, 0);
        return date;
    }),
    __metadata("design:type", Date)
], GetBookingDto.prototype, "bookingDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: new Date() }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        date.setHours(5, 0, 0, 0);
        return date;
    }),
    __metadata("design:type", Date)
], GetBookingDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: new Date(new Date().setDate(new Date().getDate() + 30)),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        date.setHours(5, 0, 0, 0);
        return date;
    }),
    __metadata("design:type", Date)
], GetBookingDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetBookingDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetBookingDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetBookingDto.prototype, "carId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetBookingDto.prototype, "driverId", void 0);
//# sourceMappingURL=get-booking.dto.js.map