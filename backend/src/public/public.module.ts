import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { DomainResolutionMiddleware } from './domain-resolution.middleware';
import { UsersModule } from '../users/users.module';
import { ResumesModule } from '../resumes/resumes.module';

@Module({
  imports: [UsersModule, ResumesModule, ConfigModule],
  controllers: [PublicController],
  providers: [PublicService, DomainResolutionMiddleware],
})
export class PublicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DomainResolutionMiddleware)
      .forRoutes({ path: 'u/*', method: RequestMethod.GET });
  }
}
