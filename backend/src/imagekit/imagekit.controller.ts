import { Controller, Get } from '@nestjs/common';
import { ImageKitService } from './imagekit.service';

@Controller('imagekit')
export class ImageKitController {
  constructor(private readonly imagekitService: ImageKitService) {}

  @Get('auth')
  getAuthenticationParameters() {
    return this.imagekitService.getAuthenticationParameters();
  }
}
