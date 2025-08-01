import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class isVerifiedUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
