import { Controller } from '@nestjs/common';
import { EndpointPermissionsService } from './endpoint-permissions.service';

@Controller()
export class EndpointPermissionsController {
  constructor(
    private readonly endpointPermissionsService: EndpointPermissionsService,
  ) {}
}
