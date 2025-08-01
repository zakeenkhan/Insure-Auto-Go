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
            await this.prisma.user.create({
                data: {
                    cnic: this.config.get('ADMIN_CNIC'),
                    password: password,
                    email: this.config.get('ADMIN_EMAIL'),
                    role: 'admin',
                    isVerified: true,
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