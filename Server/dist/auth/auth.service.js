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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signUp(dto) {
        const password = await argon.hash(dto.password);
        delete dto.password;
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const user = await this.prisma.user.create({
                data: {
                    ...dto,
                    password,
                    isVerified: true,
                    isSignUpVerified: true,
                    otp: null,
                },
            });
            delete user.password;
            return { user };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('credentials taken');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        let user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('credential incorrect');
        const pwMatch = await argon.verify(user.password, dto.password);
        if (!pwMatch)
            throw new common_1.ForbiddenException('credential incorrect');
        if (!user.isSignUpVerified || !user.isVerified) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: { isSignUpVerified: true, isVerified: true, otp: null },
            });
        }
        delete user.password;
        return { user, accessToken: await this.signToken(user) };
    }
    async signToken(user) {
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(user, {
            expiresIn: '240min',
            secret: secret,
        });
        return token;
    }
    async VerifyUser(userId) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const verifyUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true,
                isSignUpVerified: true,
                otp: null
            },
        });
        delete verifyUser.password;
        return {
            user: verifyUser,
            message: 'account verified ',
        };
    }
    async VerifySignUp(email, otp) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const verifyUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isSignUpVerified: true,
                otp: null,
            },
        });
        delete verifyUser.password;
        return {
            user: verifyUser,
            accessToken: await this.signToken(verifyUser),
            message: 'account verified ',
        };
    }
    async updateUser(userId, dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const updateUser = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
            },
        });
        delete updateUser.password;
        return updateUser;
    }
    async sendOtp(name, otp) {
        return;
    }
    async resendOtp(email) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.isSignUpVerified) {
            throw new common_1.BadRequestException('User already verified');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                otp: null
            }
        });
        return { message: 'otp resend disabled in this environment' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map