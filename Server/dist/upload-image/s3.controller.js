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
exports.UploadS3Controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const AWS = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
let UploadS3Controller = class UploadS3Controller {
    constructor() { }
    uploadFile(file) {
        return {
            url: `${process.env.AWS_CDN_URL}/${file.key}`,
            key: file.key,
        };
    }
};
exports.UploadS3Controller = UploadS3Controller;
__decorate([
    (0, common_1.Post)('photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: multerS3({
            s3: new AWS.S3Client({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_ACCESS_SECRET,
                },
            }),
            bucket: process.env.AWS_BUCKET,
            acl: process.env.AWS_ACL,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const fileName = `${process.env.AWS_CDN_ROOT_PATH}/${Date.now().toString()}-${file.originalname}`;
                cb(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadS3Controller.prototype, "uploadFile", null);
exports.UploadS3Controller = UploadS3Controller = __decorate([
    (0, common_1.Controller)('s3-upload'),
    __metadata("design:paramtypes", [])
], UploadS3Controller);
//# sourceMappingURL=s3.controller.js.map