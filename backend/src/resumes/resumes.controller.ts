import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { UpsertResumeDto } from './dto/upsert-resume.dto';
import { PublishResumeDto } from './dto/publish-resume.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthRequest {
  user: { userId: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('resumes')
export class ResumesController {
  constructor(private resumesService: ResumesService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.resumesService.findAll(req.user.userId);
  }

  @Get(':slotName')
  findOne(@Request() req: AuthRequest, @Param('slotName') slotName: string) {
    return this.resumesService.findBySlot(req.user.userId, slotName);
  }

  @Post()
  upsert(@Request() req: AuthRequest, @Body() dto: UpsertResumeDto) {
    return this.resumesService.upsert(req.user.userId, dto);
  }

  @Patch(':id/publish')
  publish(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: PublishResumeDto,
  ) {
    return this.resumesService.publish(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.resumesService.remove(req.user.userId, id);
  }
}
