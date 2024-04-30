import { Module } from '@nestjs/common';
import { EntityTypesService } from './entity-types.service';
import { EntityTypesController } from './entity-types.controller';

@Module({
  controllers: [EntityTypesController],
  providers: [EntityTypesService],
})
export class EntityTypesModule {}
