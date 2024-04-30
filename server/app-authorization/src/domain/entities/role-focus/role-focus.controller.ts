import { Controller } from '@nestjs/common';
import { RoleFocusService } from './role-focus.service';

@Controller('role-focus')
export class RoleFocusController {
  constructor(private readonly roleFocusService: RoleFocusService) {}
}
