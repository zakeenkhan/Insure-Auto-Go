import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class isVerifiedUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    return true;
  }
}
