import { Controller } from '@nestjs/common';
import { EntityTypesService } from './entity-types.service';

@Controller()
export class EntityTypesController {
  constructor(private readonly entityTypesService: EntityTypesService) {}
}
