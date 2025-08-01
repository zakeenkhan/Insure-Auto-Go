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
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const conversation_service_1 = require("./conversation.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const createMessage_dto_1 = require("./dto/createMessage.dto");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    create(req, dto) {
        return this.conversationService.create({ userId: req.user.id, driverId: dto.driverId });
    }
    createMessage(req, dto) {
        const ids = dto.convId.split('-');
        if (ids.length !== 2) {
            throw new common_1.BadRequestException('Invalid id format. Expected format: userId-driverId');
        }
        const userId = parseInt(ids[0], 10);
        const driverId = parseInt(ids[1], 10);
        if (isNaN(userId) || isNaN(driverId)) {
            throw new common_1.BadRequestException('Invalid id format. Both userId and driverId should be integers.');
        }
        if (userId != req.user.id && driverId != req.user.id)
            throw new common_1.ForbiddenException('You are not allowed to send message in this conversation');
        return this.conversationService.createMessage({
            senderId: req.user.id,
            receiverId: req.user.id == userId ? driverId : userId,
            userId: userId,
            driverId: driverId,
            content: dto.content
        });
    }
    findAll(req) {
        const userId = req.user.id;
        return this.conversationService.findAll(userId);
    }
    findOne(req, id) {
        const ids = id.split('-');
        if (ids.length !== 2) {
            throw new common_1.BadRequestException('Invalid id format. Expected format: userId-driverId');
        }
        const userId = parseInt(ids[0], 10);
        const driverId = parseInt(ids[1], 10);
        if (isNaN(userId) || isNaN(driverId)) {
            throw new common_1.BadRequestException('Invalid id format. Both userId and driverId should be integers.');
        }
        if (req.user.role !== 'admin') {
            if (userId != req.user.id && driverId != req.user.id)
                throw new common_1.ForbiddenException('You are not allowed to view this conversation');
        }
        return this.conversationService.findOne(driverId, userId);
    }
    async unReadConv(req, id) {
        const ids = id.split('-');
        if (ids.length !== 2) {
            throw new common_1.BadRequestException('Invalid id format. Expected format: userId-driverId');
        }
        const userId = parseInt(ids[0], 10);
        const driverId = parseInt(ids[1], 10);
        if (isNaN(userId) || isNaN(driverId)) {
            throw new common_1.BadRequestException('Invalid id format. Both userId and driverId should be integers.');
        }
        return await this.conversationService.unReadConv(driverId, userId, req.user.id);
    }
};
exports.ConversationController = ConversationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createMessage_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('unread/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "unReadConv", null);
exports.ConversationController = ConversationController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Conversation'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    (0, common_1.Controller)('conversation'),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
//# sourceMappingURL=conversation.controller.js.map