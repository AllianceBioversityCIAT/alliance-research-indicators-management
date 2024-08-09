import { Module } from '@nestjs/common';
import { ElementTypesService } from './element-types.service';
import { ElementTypeTypesController } from './element-types.controller';

@Module({
  controllers: [ElementTypeTypesController],
  providers: [ElementTypesService],
  exports: [ElementTypesService],
})
export class ElementypesModule {}
