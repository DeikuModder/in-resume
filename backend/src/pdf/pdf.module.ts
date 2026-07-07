import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ResumesModule } from '../resumes/resumes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, ResumesModule, UsersModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
