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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_selectors_constant_1 = require("../utils/constants/common-selectors.constant");
let ConversationService = class ConversationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const conv = await this.findOne(dto.driverId, dto.userId);
        if (conv) {
            throw new common_1.BadRequestException('Conversation already exists');
        }
        return await this.prisma.conversation.create({
            data: {
                driverId: dto.driverId,
                userId: dto.userId,
            },
        });
    }
    async createMessage(dto) {
        const conv = await this.findOne(dto.driverId, dto.userId);
        if (!conv) {
            throw new common_1.BadRequestException('Conversation not found exists');
        }
        await this.prisma.message.create({
            data: {
                driverId: dto.driverId,
                userId: dto.userId,
                'content': dto.content,
                'senderId': dto.senderId,
                'receiverId': dto.receiverId
            },
        });
        return await this.findOne(dto.driverId, dto.userId);
    }
    async findAll(userId) {
        return await this.prisma.conversation.findMany({
            where: {
                OR: [{
                        driverId: userId
                    }, { userId: userId }]
            },
            include: {
                messages: {
                    include: {
                        sender: {
                            select: common_selectors_constant_1.UserDefaultSelectors
                        },
                        receiver: { select: common_selectors_constant_1.UserDefaultSelectors }
                    },
                    orderBy: [{
                            createdAt: 'asc'
                        }]
                },
                user: { select: common_selectors_constant_1.UserDefaultSelectors },
                driver: { select: common_selectors_constant_1.UserDefaultSelectors }
            }
        });
    }
    async findOne(driverId, userId) {
        return await this.prisma.conversation.findFirst({
            where: {
                driverId,
                userId
            },
            include: {
                messages: {
                    include: {
                        sender: {
                            select: common_selectors_constant_1.UserDefaultSelectors
                        },
                        receiver: { select: common_selectors_constant_1.UserDefaultSelectors }
                    },
                    orderBy: [{
                            createdAt: 'asc'
                        }]
                },
                user: { select: common_selectors_constant_1.UserDefaultSelectors },
                driver: { select: common_selectors_constant_1.UserDefaultSelectors }
            }
        });
    }
    async unReadConv(driverId, userId, reqUserId) {
        const conv = await this.findOne(driverId, userId);
        if (!conv) {
            throw new common_1.BadRequestException('Conversation not found exists');
        }
        const messagesPromises = [];
        for (const message of conv.messages) {
            if (message.receiverId === reqUserId && message.isSeen === false) {
                messagesPromises.push(this.prisma.message.update({
                    where: {
                        id: message.id,
                    },
                    data: {
                        isSeen: true,
                    },
                }));
            }
        }
        await Promise.all(messagesPromises);
        return await this.findOne(driverId, userId);
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map