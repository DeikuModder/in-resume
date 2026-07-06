import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class DomainResolutionMiddleware implements NestMiddleware {
  private readonly appDomain: string;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.appDomain = this.configService.get<string>('APP_DOMAIN', 'inresume.com');
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;

    // Skip for main app domain and localhost
    if (
      host === this.appDomain ||
      host === `www.${this.appDomain}` ||
      host === 'localhost' ||
      host === '127.0.0.1'
    ) {
      return next();
    }

    const user = await this.usersService.findByCustomDomain(host);
    if (!user?.username) {
      return next();
    }

    // Rewrite to the public username route handled by PublicController
    req.url = `/u/${user.username}`;
    next();
  }
}
