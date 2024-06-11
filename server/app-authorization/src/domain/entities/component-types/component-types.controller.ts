import { Controller } from '@nestjs/common';
import { ComponentTypesService } from './component-types.service';

@Controller()
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}
}
