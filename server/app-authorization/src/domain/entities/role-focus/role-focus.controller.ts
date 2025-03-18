import { Controller } from '@nestjs/common';
import { RoleFocusService } from './role-focus.service';

@Controller()
export class RoleFocusController {
  constructor(private readonly roleFocusService: RoleFocusService) {}
}
