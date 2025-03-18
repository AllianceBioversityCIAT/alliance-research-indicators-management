import { Controller } from '@nestjs/common';
import { OrganizationalEntitiesService } from './organizational-entities.service';

@Controller()
export class OrganizationalEntitiesController {
  constructor(
    private readonly organizationalEntitiesService: OrganizationalEntitiesService,
  ) {}
}
