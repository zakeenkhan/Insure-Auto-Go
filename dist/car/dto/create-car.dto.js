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
exports.CreateCarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCarDto {
}
exports.CreateCarDto = CreateCarDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'Toyota' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "carPicture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: new Date() }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], CreateCarDto.prototype, "carPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'DG Khan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'KAA 1234' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "registrationNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Sedan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '2020' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "makeYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 4 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCarDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Toyota' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "Make", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Petrol', enum: client_1.FuelType }),
    (0, class_validator_1.IsEnum)(client_1.FuelType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCarDto.prototype, "insured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCarDto.prototype, "rentPerDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCarDto.prototype, "insuranceRequired", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Automatic', enum: client_1.CarTransmission }),
    (0, class_validator_1.IsEnum)(client_1.CarTransmission),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "carTransmission", void 0);
//# sourceMappingURL=create-car.dto.js.map