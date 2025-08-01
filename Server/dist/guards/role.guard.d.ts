import { ExecutionContext } from '@nestjs/common';
export declare const RoleGuard: (roles?: string[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): Promise<boolean>;
}>;
