import { Module } from '@nestjs/common';
import { UrlGeneratorService } from '../service/url-generator.service';

@Module({
  providers: [UrlGeneratorService],
  exports: [UrlGeneratorService],
})
export class UrlGeneratorModule {}
