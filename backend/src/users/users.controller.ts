import {
  Controller,
  Patch,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateDomainDto } from './dto/update-domain.dto';

interface AuthRequest {
  user: { userId: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Patch('domain')
  async setCustomDomain(
    @Request() req: AuthRequest,
    @Body() dto: UpdateDomainDto,
  ) {
    await this.usersService.updateCustomDomain(req.user.userId, dto.domain);
    const appDomain = this.configService.get<string>('APP_DOMAIN', 'inresume.com');
    return {
      domain: dto.domain,
      instructions: {
        type: 'CNAME',
        name: 'resume',
        value: `custom.${appDomain}`,
        ttl: 3600,
        note: 'For apex domain use @ as the name. DNS changes may take up to 48 hours to propagate.',
      },
    };
  }

  @Get('domain/verify')
  verifyDomain(@Request() req: AuthRequest) {
    return this.usersService.verifyCustomDomain(req.user.userId);
  }
}
