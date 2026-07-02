import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthRequest {
  user: { userId: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get(':slotName')
  async generate(
    @Request() req: AuthRequest,
    @Param('slotName') slotName: string,
    @Res() res: Response,
  ) {
    const pdf = await this.pdfService.generate(req.user.userId, slotName);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${slotName}.pdf"`,
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }
}
