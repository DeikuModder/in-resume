import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ResumesModule } from '../resumes/resumes.module';

@Module({
  imports: [ResumesModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
