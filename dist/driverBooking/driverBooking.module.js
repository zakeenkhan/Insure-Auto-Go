"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBookingModule = void 0;
const common_1 = require("@nestjs/common");
const driverBooking_service_1 = require("./driverBooking.service");
const driverBooking_controller_1 = require("./driverBooking.controller");
let DriverBookingModule = class DriverBookingModule {
};
exports.DriverBookingModule = DriverBookingModule;
exports.DriverBookingModule = DriverBookingModule = __decorate([
    (0, common_1.Module)({
        controllers: [driverBooking_controller_1.DriverBookingController],
        providers: [driverBooking_service_1.DriverBookingService],
    })
], DriverBookingModule);
//# sourceMappingURL=driverBooking.module.js.map