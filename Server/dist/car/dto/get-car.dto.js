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
exports.GetCarDto = exports.CustomDateRangeValidator = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../utils/dto/pagination.dto");
let CustomDateRangeValidator = class CustomDateRangeValidator {
    validate(isAvailable, args) {
        const object = args.object;
        if (object.startDate && object.endDate) {
            return object.startDate < object.endDate;
        }
        return true;
    }
    defaultMessage(args) {
        return 'startDate must be less than endDate';
    }
};
exports.CustomDateRangeValidator = CustomDateRangeValidator;
exports.CustomDateRangeValidator = CustomDateRangeValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'CustomDateRangeValidator', async: false })
], CustomDateRangeValidator);
class GetCarDto extends pagination_dto_1.PaginationDto {
}
exports.GetCarDto = GetCarDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search for cars by name, model, or Registration Number',
        example: 'Toyota Corolla',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCarDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter cars by car type',
        example: 'Sedan',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCarDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Automatic', enum: client_1.CarTransmission }),
    (0, class_validator_1.IsEnum)(client_1.CarTransmission),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetCarDto.prototype, "carTransmission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: new Date() }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.ValidateIf)((o) => o.isAvailable !== undefined),
    __metadata("design:type", Date)
], GetCarDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: new Date(new Date().setDate(new Date().getDate() + 30)),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.ValidateIf)((o) => o.isAvailable !== undefined),
    __metadata("design:type", Date)
], GetCarDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            if (value === 'true')
                return true;
            else if (value === 'false')
                return false;
        }
        return value;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.ValidateIf)((o) => o.startDate && o.endDate),
    (0, class_validator_1.Validate)(CustomDateRangeValidator, {
        message: 'startDate must be less than endDate',
    }),
    __metadata("design:type", Boolean)
], GetCarDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Petrol', enum: client_1.FuelType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.FuelType),
    __metadata("design:type", String)
], GetCarDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search for cars by make',
        example: 'Toyota',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCarDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search for cars by city',
        example: 'DG Khan',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCarDto.prototype, "city", void 0);
//# sourceMappingURL=get-car.dto.js.map