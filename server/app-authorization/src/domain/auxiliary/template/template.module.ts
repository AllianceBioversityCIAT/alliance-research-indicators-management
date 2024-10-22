import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MessageMicroservice } from '../../tools/broker/message.microservice';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, MessageMicroservice],
  exports: [TemplateService],
})
export class TemplateModule {}
