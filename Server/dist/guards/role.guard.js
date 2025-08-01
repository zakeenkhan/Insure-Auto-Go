"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("@nestjs/core/guards");
const RoleGuard = (roles = ['admin']) => {
    return (0, common_1.mixin)(class RoleGuard {
        async canActivate(context) {
            const { user } = context.switchToHttp().getRequest();
            const hasRequiredRole = roles.includes(user.role);
            if (!hasRequiredRole) {
                throw new common_1.ForbiddenException(guards_1.FORBIDDEN_MESSAGE);
            }
            return hasRequiredRole;
        }
    });
};
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map