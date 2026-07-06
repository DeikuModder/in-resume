import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { AnonymousPdfDto } from './dto/anonymous-pdf.dto';

interface AuthRequest {
  user: { userId: string; email: string };
}

@Controller('pdf')
export class PdfController {
  constructor(
    private pdfService: PdfService,
    private usersService: UsersService,
  ) {}

  /** Public endpoint — no auth required. Rate-limited to 3 per hour per IP. */
  @Throttle({ default: { ttl: 3600000, limit: 3 } })
  @Post('anonymous')
  async generateAnonymous(@Body() dto: AnonymousPdfDto, @Res() res: Response) {
    const pdf = await this.pdfService.generateFromData(dto, {
      watermark: true,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume.pdf"`,
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slotName')
  async generate(
    @Request() req: AuthRequest,
    @Param('slotName') slotName: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findById(req.user.userId);
    const isPremium = (user as any)?.subscriptionTier === 'premium';

    const pdf = await this.pdfService.generate(req.user.userId, slotName, {
      watermark: !isPremium,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${slotName}.pdf"`,
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }
}
