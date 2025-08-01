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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const update_rating_dto_1 = require("./dto/update-rating.dto");
const auth_guard_1 = require("../guards/auth.guard");
const isVerifyUser_guard_1 = require("../guards/isVerifyUser.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const get_rating_dto_1 = require("./dto/get-rating.dto");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    create(req, createRatingDto) {
        const userId = req.user.id;
        return this.ratingService.create({ ...createRatingDto, ratedById: userId });
    }
    findAll(req, query) {
        return this.ratingService.findAll(req.user, query);
    }
    findOne(id) {
        return this.ratingService.findOne(+id);
    }
    update(req, id, updateRatingDto) {
        const userId = req.user.id;
        return this.ratingService.update(id, {
            ...updateRatingDto,
            ratedById: userId,
        });
    }
    remove(id) {
        return this.ratingService.remove(+id);
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_rating_dto_1.GetRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "remove", null);
exports.RatingController = RatingController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, isVerifyUser_guard_1.isVerifiedUserGuard, (0, role_guard_1.RoleGuard)(['admin', 'appUser'])),
    (0, swagger_1.ApiTags)('Rating'),
    (0, common_1.Controller)('rating'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map