import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ResumesModule } from '../resumes/resumes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ResumesModule, UsersModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
