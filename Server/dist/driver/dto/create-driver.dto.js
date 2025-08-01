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
exports.CreateDriverDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateDriverDto {
}
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: '1234567890' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '2024-01-01' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], CreateDriverDto.prototype, "licenseExpiry", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 'https://example.com/license.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licensePicture", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 'A1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "lisenceType", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 'https://example.com/driver.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "driverPicture", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 'abbotabad' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "per12HoursRate", void 0);
//# sourceMappingURL=create-driver.dto.js.map