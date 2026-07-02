import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const dbUser = await this.usersService.findById(user.userId);
    if (!dbUser || dbUser.subscriptionTier !== 'premium') {
      throw new ForbiddenException('Premium subscription required');
    }

    return true;
  }
}
