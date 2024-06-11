import { Module } from '@nestjs/common';
import { ViewComponentsService } from './view_components.service';
import { ViewComponentsController } from './view_components.controller';

@Module({
  controllers: [ViewComponentsController],
  providers: [ViewComponentsService],
})
export class ViewComponentsModule {}
