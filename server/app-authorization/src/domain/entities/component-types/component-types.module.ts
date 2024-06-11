import { Module } from '@nestjs/common';
import { ComponentTypesService } from './component-types.service';
import { ComponentTypesController } from './component-types.controller';

@Module({
  controllers: [ComponentTypesController],
  providers: [ComponentTypesService],
})
export class ComponentTypesModule {}
