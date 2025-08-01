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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const create_car_dto_1 = require("./dto/create-car.dto");
const update_car_dto_1 = require("./dto/update-car.dto");
const auth_guard_1 = require("../guards/auth.guard");
const isVerifyUser_guard_1 = require("../guards/isVerifyUser.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const get_car_dto_1 = require("./dto/get-car.dto");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    create(req, createCarDto) {
        const userId = req.user.id;
        const payload = {
            ...createCarDto,
            ownerId: userId,
        };
        return this.carService.create(payload);
    }
    findAll(query) {
        return this.carService.findAll(query);
    }
    findOne(id) {
        return this.carService.findOne(id);
    }
    update(req, id, updateCarDto) {
        const userId = req.user.id;
        return this.carService.update(userId, id, updateCarDto);
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_car_dto_1.GetCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "update", null);
exports.CarController = CarController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, isVerifyUser_guard_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    (0, swagger_2.ApiTags)('Car'),
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map