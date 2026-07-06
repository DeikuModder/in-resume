import { Module } from '@nestjs/common';
import { ImageKitController } from './imagekit.controller';
import { ImageKitService } from './imagekit.service';

@Module({
  controllers: [ImageKitController],
  providers: [ImageKitService],
})
export class ImageKitModule {}
