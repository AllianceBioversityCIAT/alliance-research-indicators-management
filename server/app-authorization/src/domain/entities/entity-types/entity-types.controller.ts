import { Controller } from '@nestjs/common';
import { EntityTypesService } from './entity-types.service';

@Controller('entity-types')
export class EntityTypesController {
  constructor(private readonly entityTypesService: EntityTypesService) {}
}
