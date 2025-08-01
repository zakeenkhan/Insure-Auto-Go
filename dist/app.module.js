"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const upload_image_module_1 = require("./upload-image/upload-image.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const userSeeder_service_1 = require("./userSeeder.service");
const car_module_1 = require("./car/car.module");
const booking_module_1 = require("./booking/booking.module");
const driver_module_1 = require("./driver/driver.module");
const rating_module_1 = require("./rating/rating.module");
const response_interceptor_1 = require("./utils/global-interceptors/response.interceptor");
const global_exception_filter_interceptor_1 = require("./utils/global-interceptors/global-exception-filter.interceptor");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./user/user.module");
const driverBooking_module_1 = require("./driverBooking/driverBooking.module");
const conversation_module_1 = require("./conversation/conversation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            upload_image_module_1.UploadImageModule,
            car_module_1.CarModule,
            booking_module_1.BookingModule,
            driver_module_1.DriverModule,
            rating_module_1.RatingModule,
            user_module_1.UserModule,
            driverBooking_module_1.DriverBookingModule,
            conversation_module_1.ConversationModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            userSeeder_service_1.UserSeederService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_interceptor_1.GlobalExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map