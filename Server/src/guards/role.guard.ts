import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
} from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

export const RoleGuard = (roles: string[] = ['admin']) => {
  return mixin(
    class RoleGuard implements CanActivate {
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        const hasRequiredRole = roles.includes(user.role);

        if (!hasRequiredRole) {
          throw new ForbiddenException(FORBIDDEN_MESSAGE);
        }
        return hasRequiredRole;
      }
    },
  );
};
